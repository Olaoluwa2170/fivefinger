import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { tokenDto } from './constants';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: Prisma.UserCreateInput,
  ): Promise<tokenDto> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/sign-in')
  @UseGuards(AuthGuard('jwt-access'))
  async signIn(
    @Body() signInDto: SignInDto,
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = await this.authService.signIn(signInDto);
    res.cookie('refresh', refreshToken);
    console.log(req.user);
    return this.authService.signIn(signInDto);
  }
}
