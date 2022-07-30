import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('gses2.app/api');
  app.enableCors();

  await app.listen(PORT, () => console.info(`Server runs on port: ${PORT}`));
}
bootstrap();
