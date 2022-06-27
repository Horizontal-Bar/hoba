import {TokenPair} from './token';
import {UserCredentials} from './user';

export const enum AuthProvider {
    Telegram = 'telegram',
}

export type LoginDto = TelegramLoginDto;

export interface TelegramLoginDto extends Partial<Omit<UserCredentials, 'id'>> {
    provider: AuthProvider.Telegram;
    hash: string;
    id: number;
}

export const isTelegramProvider = (dto: {
    provider: AuthProvider;
}): dto is TelegramLoginDto => dto.provider === AuthProvider.Telegram;

export interface LoginResponse extends TokenPair, UserCredentials {}
