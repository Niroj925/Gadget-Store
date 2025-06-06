import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exceptions/global.exception';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'*',
    // origin: ['http://192.168.1.94:5173'],
    credentials: true
  }); 
  app.setGlobalPrefix('api/v1');
  
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('API Documentation for Ecommerce')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'access-token',
        description: 'Enter access-token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(4000);
}
bootstrap()
  .then(() => {
    console.log('Server started in http://localhost:4000/api');
  })
  .catch((e) =>
    console.error(`Error started while server starting as \n ${e.message}`),
  );
