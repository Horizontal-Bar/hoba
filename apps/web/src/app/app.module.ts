import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {WebCoreTuiModule} from '@hoba/web/core/tui';
import {WebCoreIonicModule} from '@hoba/web/core/ionic';
import {WebCoreHttpModule} from '@hoba/web/core/http';
import {WebCoreStoreModule} from '@hoba/web/core/store';

import {AppComponent} from './app.component';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        WebCoreHttpModule,
        WebCoreIonicModule,
        WebCoreTuiModule,
        WebCoreStoreModule,

        RouterModule.forRoot([
            {
                path: '',
                loadChildren: () => import('@hoba/web/shell').then(m => m.WebShellModule),
            },
        ]),
    ],

    providers: [DeviceMotion],

    bootstrap: [AppComponent],
})
export class AppModule {}
