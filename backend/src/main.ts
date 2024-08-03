import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const config = new DocumentBuilder()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /* app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
 */
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3001);
}
bootstrap();
