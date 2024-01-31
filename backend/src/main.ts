import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { credentials } from './middleware/credentials';
import corsOptions from './config/corsOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(credentials);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
