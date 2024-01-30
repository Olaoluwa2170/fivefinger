import { Controller, Post, Body, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { tokenDto } from './constants';
import { Response } from 'express';

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
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = await this.authService.signIn(signInDto);
    res.cookie('refresh', refreshToken, {
      maxAge: 9000000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return this.authService.signIn(signInDto);
  }
}
