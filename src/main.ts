import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ParseIntPipe, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({origin: "*"});
    app.useGlobalPipes(new ValidationPipe());

    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
        .setTitle('GestionDePark')
        .setDescription('Manage your park easily')
        .setVersion('3.0.3')
        .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(8080);
}
bootstrap();
