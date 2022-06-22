import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';

@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePageComponent,
            },
        ]),
        IonicModule,
    ],
})
export class HomePageModule { }
