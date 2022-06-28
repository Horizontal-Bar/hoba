import {TokenPair} from './token';
import {UserCredentials} from './user';

export enum AuthProvider {
    Telegram = 'telegram',
}

export type LoginDto = TelegramLoginDto;

export type TelegramUserId = number;

export interface TelegramLoginDto extends Partial<Omit<UserCredentials, 'id'>> {
    provider: AuthProvider.Telegram;
    hash: string;
    id: TelegramUserId;
}

export const isTelegramProvider = (dto: {
    provider: AuthProvider;
}): dto is TelegramLoginDto => dto.provider === AuthProvider.Telegram;

export interface LoginResponse extends TokenPair, UserCredentials {}
