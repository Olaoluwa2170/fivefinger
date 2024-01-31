import { Controller, Post, Body, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { secretExpire, tokenDto } from './constants';
import { Response } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: Prisma.UserCreateInput,
  ): Promise<tokenDto> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/sign-in')
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
      maxAge: 168 * 60 * 60 * 10000,
    });
    return this.authService.signIn(signInDto);
  }
}
