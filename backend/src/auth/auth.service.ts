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
    const user = this.databaseService.user.create({
      data: {
        password: hashPassword,
        ...others,
      },
    });
    const accessToken = await this.jwtService.signAsync(
      { id: (await user).id },
      secretExpire.accessToken,
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: (await user).id },
      secretExpire.refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  // sign in
  async signIn(
    signInDto: SignInDto,
    // res,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      secretExpire.refreshToken,
    );

    // res.cookie('refresh', refreshToken, {
    //   httpOnly: true,
    //   sameSite: 'None',
    //   secure: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    return {
      accessToken,
      refreshToken,
    };
  }
}
