import {
  Controller,
  ForbiddenException,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as jwt from 'jsonwebtoken';
import { jwtConstants, secretExpire } from 'src/auth/constants';
import { JwtService } from '@nestjs/jwt';

@Controller('refresh')
export class RefreshTokenController {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  @Get()
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
        return accessToken;
      },
    );

    return accessToken;
  }
}
