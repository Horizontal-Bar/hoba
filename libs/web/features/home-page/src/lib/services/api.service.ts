import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {
    AuthProvider,
    LoginDto,
    LoginResponse,
    PingResponse,
} from '@hoba/shared/interfaces';
import {TelegramUserCredentials} from '@hoba/web/shared/telegram-login';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly host = '/api';

    constructor(private readonly http: HttpClient) {}

    ping() {
        return this.http
            .get<PingResponse>(this.host + '/ping')
            .pipe(map(response => response.message));
    }

    login(dto: LoginDto): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.host + '/auth/login', dto);
    }

    loginViaTelegram(telegramUser: TelegramUserCredentials): Observable<LoginResponse> {
        return this.login({
            provider: AuthProvider.Telegram,
            hash: telegramUser.hash,
            id: telegramUser.id,
            login: telegramUser.username,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            avatarUrl: telegramUser.photo_url,
        });
    }
}
