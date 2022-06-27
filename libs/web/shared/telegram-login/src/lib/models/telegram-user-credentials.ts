export type TelegramUserId = number;

export interface TelegramUserCredentials {
    readonly id: number;
    readonly hash: string;
    readonly auth_date: number;
    readonly first_name?: string;
    readonly last_name?: string;
    readonly photo_url?: string;
    readonly username?: string;
}
