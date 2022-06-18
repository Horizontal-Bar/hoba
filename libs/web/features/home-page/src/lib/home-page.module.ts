import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

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
export class HomePageModule {}
