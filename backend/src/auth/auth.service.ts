import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  // sign-in
  async signUp(
    createUserDto: Prisma.UserCreateInput,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { password, ...others } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.databaseService.user.create({
      data: {
        password: hashPassword,
        ...others,
      },
    });
    const accessToken = this.jwtService.sign({ id: (await user).id });
    const refreshToken = sign(
      { id: (await user).id },
      process.env.JWT_REFRESH_SECRET,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  // sign in
  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    const matchPassword = bcrypt.compare(password, user.password);

    if (!matchPassword) throw new UnauthorizedException('Wrong Password');

    const accessToken = this.jwtService.sign({ id: user.id });
    const refreshToken = sign({ id: user.id }, process.env.JWT_REFRESH_SECRET);

    return {
      accessToken,
      refreshToken,
    };
  }
}
