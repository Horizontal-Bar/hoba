import {ModuleWithProviders, NgModule} from '@angular/core';
import {TelegramLoginComponent} from './telegram-login.component';
import {provideTelegramLoginConfig, TelegramLoginConfig} from './models';

@NgModule({
    declarations: [TelegramLoginComponent],
    exports: [TelegramLoginComponent],
})
export class TelegramLoginModule {
    static configure(
        config: Partial<TelegramLoginConfig> & {botUserName: string},
    ): ModuleWithProviders<TelegramLoginModule> {
        return {
            ngModule: TelegramLoginModule,
            providers: [provideTelegramLoginConfig(config)],
        };
    }
}
