import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the base views directory to the 'views' directory
  app.setBaseViewsDir( './src/views');

  // Register the Handlebars (HBS) view engine
  app.setViewEngine('hbs');

  // Serve static assets from the 'public' directory
  app.useStaticAssets('./src/public');

  await app.listen(3000);
}

bootstrap();