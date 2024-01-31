import {
  Controller,
  Post,
  Body,
  Res,
  ForbiddenException,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { jwtConstants, secretExpire } from './constants';
import { Response } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post('auth/sign-up')
  async signUp(
    @Body() createUserDto: Prisma.UserCreateInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password, ...others } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const refreshToken = await this.jwtService.signAsync(
      { email },
      secretExpire.refreshToken,
    );
    await this.databaseService.user.create({
      data: {
        email,
        password: hashPassword,
        refreshToken: refreshToken,
        ...others,
      },
    });
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 10000,
      secure: true,
      sameSite: 'none',
    });
    return this.authService.signUp(createUserDto);
  }

  @Post('auth/sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      secretExpire.refreshToken,
    );
    await this.databaseService.user.update({
      where: {
        email: signInDto.email,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 10000,
      secure: true,
      sameSite: 'none',
    });
    return this.authService.signIn(signInDto);
  }

  @Get('refresh')
  async getRefresh(@Req() req) {
    const cookies = req.cookies;
    if (!cookies?.refresh) throw new UnauthorizedException();
    const refreshToken = await cookies.refresh;
    const user = await this.databaseService.user.findMany({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user) throw new ForbiddenException();
    const accessToken = jwt.verify(
      refreshToken,
      jwtConstants.refreshTokenSecret,
      async (err, decoded) => {
        if (err || user[0].id !== decoded.id) throw new ForbiddenException();
        const accessToken = await this.jwtService.signAsync(
          { id: user[0].id },
          secretExpire.accessToken,
        );

        return { accessToken };
      },
    );

    return accessToken;
  }

  @Get('logout')
  async logOut(@Req() req, @Res() res: Response) {
    const cookies = req.cookies;
    if (!cookies?.refresh) return res.sendStatus(204);
    const refreshToken = await cookies.refresh;
    const user = await this.databaseService.user.findMany({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user) {
      res.clearCookie('refresh', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.sendStatus(204);
    }
    await this.databaseService.user.update({
      where: { id: user[0].id },
      data: {
        refreshToken: '',
      },
    });
    res.clearCookie('refresh', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.sendStatus(204);
  }
}
