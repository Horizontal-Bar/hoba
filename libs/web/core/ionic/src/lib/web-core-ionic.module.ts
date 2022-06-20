import {NgModule} from '@angular/core';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {RouteReuseStrategy} from '@angular/router';

@NgModule({
    imports: [IonicModule.forRoot()],
    exports: [IonicModule],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
    ],
})
export class WebCoreIonicModule {}
