import { Controller, Post, Body, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { tokenDto } from './constants';
import { Response } from 'express';
import { DatabaseService } from 'src/database/database.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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
    const refreshToken = user.refreshToken;
    res.cookie('refresh', refreshToken);
    return this.authService.signIn(signInDto);
  }
}
