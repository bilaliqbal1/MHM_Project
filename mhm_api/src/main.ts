import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentUtils } from './shared/utils/environment-utils';

async function bootstrap() {
  EnvironmentUtils.init();
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  logger.verbose(`Service is listening on ${await app.getUrl()}`);
}
bootstrap();
