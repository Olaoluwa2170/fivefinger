import { Controller, Post, Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: Prisma.UserCreateInput,
  ): Promise<{ token: string }> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }
}