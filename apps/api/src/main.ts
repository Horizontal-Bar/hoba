import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {APP_CONFIG} from './app/app.config';

const {port, globalPrefix, cors} = APP_CONFIG;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    if (cors) app.enableCors();
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    await app.listen(port);
    Logger.log(`🚀 Application is running on: ${port}/${globalPrefix}`);
}

bootstrap();
