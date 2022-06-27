import {Injectable} from '@nestjs/common';
import {
    isTelegramProvider,
    LoginDto,
    LoginResponse,
    TelegramLoginDto,
} from '@hoba/shared/interfaces';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
    login(dto: LoginDto): Observable<LoginResponse> {
        switch (true) {
            case isTelegramProvider(dto):
                return this.telegramAuth(dto);
            default:
                throw new Error('unknown provider');
        }
    }

    telegramAuth(dto: TelegramLoginDto): Observable<LoginResponse> {
        return of({
            id: uuid.v4(),
            login: dto.login,
            accessToken: jwt.sign({}, '123'),
            refreshToken: uuid.v4(),
            avatarUrl: dto.avatarUrl,
            firstName: dto.firstName,
            lastName: dto.lastName,
            middleName: dto.middleName,
        });
    }
}
