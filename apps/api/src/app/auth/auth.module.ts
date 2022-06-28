import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {RefreshTokenModelDefinition, UserAuthProviderModelDefinition} from './schemas';
import {UserModelDefinition} from '../users/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([
            UserModelDefinition,
            UserAuthProviderModelDefinition,
            RefreshTokenModelDefinition,
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
