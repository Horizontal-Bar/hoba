import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {TelegramLoginModule} from '@hoba/web/shared/telegram-login';

@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        IonicModule,

        RouterModule.forChild([
            {
                path: '',
                component: HomePageComponent,
            },
        ]),

        TelegramLoginModule.configure({
            botUserName: 'hoba_app_bot',
        }),
    ],
})
export class HomePageModule {}
