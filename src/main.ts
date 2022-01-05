import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //for setting global prefix for all routes
  app.enableCors(); // fixes CORS problems
  await app.listen(3000);
}
bootstrap();
