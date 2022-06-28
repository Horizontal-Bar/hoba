import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AuthModule} from './auth';
import {APP_CONFIG} from './app.config';
import {AppController} from './app.controller';

@Module({
    imports: [MongooseModule.forRoot(APP_CONFIG.dbConnection), AuthModule],
    controllers: [AppController],
})
export class AppModule {}
