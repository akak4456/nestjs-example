import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DateInterceptor } from './common/interceptors/date.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new DateInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
