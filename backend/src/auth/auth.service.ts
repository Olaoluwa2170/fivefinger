import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { secretExpire } from './constants';
import { tokenDto } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  // sign-in
  async signUp(createUserDto: Prisma.UserCreateInput): Promise<tokenDto> {
    const { password, ...others } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.databaseService.user.create({
      data: {
        password: hashPassword,
        ...others,
      },
    });
    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      secretExpire.accessToken,
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      secretExpire.refreshToken,
    );

    this.databaseService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    return {
      accessToken,
    };
  }

  // sign in
  async signIn(signInDto: SignInDto): Promise<tokenDto> {
    const { email, password } = signInDto;
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    const matchPassword = bcrypt.compare(password, user.password);

    if (!matchPassword) throw new UnauthorizedException('Wrong Password');

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      secretExpire.accessToken,
    );

    return {
      accessToken,
    };
  }
}
