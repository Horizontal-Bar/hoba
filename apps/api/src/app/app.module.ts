import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {LoginService} from './login.service';

@Module({
    imports: [
        // DatabaseModule
    ],
    controllers: [AppController],
    providers: [LoginService],
})
export class AppModule {}
