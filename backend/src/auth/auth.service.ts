import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  // sign-in
  async signUp(
    createUserDto: Prisma.UserCreateInput,
  ): Promise<{ token: string }> {
    const { password, ...others } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.databaseService.user.create({
      data: {
        password: hashPassword,
        ...others,
      },
    });
    const token = this.jwtService.sign({ id: (await user).id });

    return { token };
  }

  // sign in
  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    const matchPassword = bcrypt.compare(password, user.password);

    if (!matchPassword) throw new UnauthorizedException('Wrong Password');

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
