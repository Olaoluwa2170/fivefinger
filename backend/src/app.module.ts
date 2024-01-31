import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, RefreshTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
