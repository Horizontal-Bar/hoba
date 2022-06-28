import {InjectionToken, Provider} from '@angular/core';

export interface TelegramLoginConfig {
    botUserName: string;
    src: string;
    authorizationType: 'callback' | 'redirectToUrl';
    requestAccess: 'write';
    size: 'large' | 'medium' | 'small';
    showUserPhoto: boolean;
    radius: number;
}

export const TELEGRAM_LOGIN_CONFIG = new InjectionToken<TelegramLoginConfig>(
    'Telegram login widget config',
);

const defaultConfig: Omit<TelegramLoginConfig, 'botUserName'> = {
    src: 'https://telegram.org/js/telegram-widget.js?19',
    authorizationType: 'callback',
    requestAccess: 'write',
    size: 'large',
    showUserPhoto: true,
    radius: 20,
};

export const provideTelegramLoginConfig = (
    config: Partial<TelegramLoginConfig> & {botUserName: string},
): Provider => [
    {
        provide: TELEGRAM_LOGIN_CONFIG,
        useValue: {
            ...defaultConfig,
            ...config,
        },
    },
];
