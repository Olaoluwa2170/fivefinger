import { Module } from '@nestjs/common';
import { RefreshTokenController } from './refresh-token.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DatabaseModule, JwtModule, PassportModule],
  controllers: [RefreshTokenController],
})
export class RefreshTokenModule {}
