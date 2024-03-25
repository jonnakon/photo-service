import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerInfo ={
  api_path: `/docs`,
  title: `Photo service API`,
  description: `Service API for photos`,
  version: `0.9`,
  tag: ``
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const usersService = app.get(UsersService);
  await usersService.createFirstAdminUser();

  const config = new DocumentBuilder()
  .setTitle(swaggerInfo.title)
  .setDescription(swaggerInfo.description)
  .setVersion(swaggerInfo.version)
  .addTag(swaggerInfo.tag)
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(swaggerInfo.api_path, app, document)


  await app.listen(3000);
}
bootstrap();
