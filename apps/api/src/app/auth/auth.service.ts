import {Injectable} from '@nestjs/common';
import {
    AuthProvider,
    isTelegramProvider,
    LoginDto,
    LoginResponse,
    TelegramLoginDto,
} from '@hoba/shared/interfaces';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import {HmacSHA256, SHA256} from 'crypto-js';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../users/schemas';
import {Model} from 'mongoose';
import {RefreshToken, UserAuthProvider} from './schemas';
import {APP_CONFIG} from '../app.config';

export const createTelegramDataCheckString = (
    dto: Omit<TelegramLoginDto, 'provider'>,
): string =>
    Object.keys(dto)
        .sort()
        .map(key => `${key}=${dto[key]}`)
        .join('\n');

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(RefreshToken.name)
        private readonly refreshTokenModel: Model<RefreshToken>,
        @InjectModel(UserAuthProvider.name)
        private readonly userAuthProviderModel: Model<UserAuthProvider>,
    ) {}

    login(dto: LoginDto): Promise<LoginResponse> {
        switch (true) {
            case isTelegramProvider(dto):
                return this.telegramAuth(dto);
            default:
                throw new Error('unknown provider');
        }
    }

    private validateHash(dto: TelegramLoginDto): boolean {
        const dataCheckString = createTelegramDataCheckString(dto);
        const secretKey = SHA256(APP_CONFIG.tgBotToken);
        const hash = HmacSHA256(dataCheckString, secretKey);

        console.log(dataCheckString);
        console.log(secretKey);
        console.log(hash);

        return true;
    }

    async telegramAuth(dto: TelegramLoginDto): Promise<LoginResponse> {
        if (!this.validateHash(dto)) {
            return;
        }

        const user = await this.findUserByProviderId({
            providerType: AuthProvider.Telegram,
            providerUserId: dto.id,
        });

        if (user) {
            return {
                id: user.id,
                login: user.login,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
                accessToken: jwt.sign({}, '123'),
                refreshToken: uuid.v4(),
            };
        }

        const newUser = await this.createUser(dto);

        await this.createUserAuthProvider({
            providerType: AuthProvider.Telegram,
            providerUserId: dto.id,
            userId: newUser.id,
        });

        return {
            id: newUser.id,
            login: newUser.login,
            firstName: newUser.firstName,
            middleName: newUser.middleName,
            lastName: newUser.lastName,
            avatarUrl: newUser.avatarUrl,
            accessToken: jwt.sign({}, '123'),
            refreshToken: uuid.v4(),
        };
    }

    async findUserByProviderId(dto: {
        providerUserId: string | number;
        providerType: AuthProvider;
    }): Promise<User | undefined> {
        const userAuthProvider = await this.userAuthProviderModel.findOne(dto).exec();

        if (!userAuthProvider) {
            return undefined;
        }

        const user = await this.userModel.findOne({id: userAuthProvider.userId}).exec();

        if (!user) {
            return undefined;
        }

        return user;
    }

    async createUser(dto: TelegramLoginDto) {
        const [user] = await this.userModel.create([
            {
                login: dto.login,
                firstName: dto.firstName,
                middleName: dto.middleName,
                lastName: dto.lastName,
                avatarUrl: dto.avatarUrl,
            },
        ]);

        return user;
    }

    createUserAuthProvider(dto: {
        providerType: AuthProvider;
        providerUserId: string | number;
        userId: string;
    }) {
        return this.userAuthProviderModel.create(dto);
    }
}
