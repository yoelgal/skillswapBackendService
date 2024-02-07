import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SeedService } from '../seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const seedService = app.get(SeedService);

  if (process.env.NODE_ENV === 'production') {
    await seedService.seedForProd();
  } else {
    await seedService.seedForDev();
  }
  Logger.log('Seeding complete');
  await app.listen(3000);
}

bootstrap();
