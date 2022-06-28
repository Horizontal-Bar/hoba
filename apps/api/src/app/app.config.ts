import {config} from 'dotenv';

type Env = 'CORS' | 'GLOBAL_PREFIX' | 'PORT' | 'DB_CONNECTION' | 'TG_BOT_TOKEN';

const env = config({path: './apps/api/.env'}).parsed as Record<Env, string>;

export interface AppConfig {
    readonly cors: boolean;
    readonly globalPrefix: string;
    readonly port: number;
    readonly dbConnection: string;
    readonly tgBotToken: string;
}

const toNumber = (str: string) => parseInt(str, 10);
const toBoolean = (str: string) => Boolean(str);

export const APP_CONFIG: AppConfig = {
    cors: toBoolean(env.CORS),
    globalPrefix: env.GLOBAL_PREFIX,
    port: toNumber(env.PORT),
    dbConnection: env.DB_CONNECTION,
    tgBotToken: env.TG_BOT_TOKEN,
};
