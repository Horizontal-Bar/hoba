import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                loadChildren: () =>
                    import('@hoba/web/features/home-page').then(m => m.HomePageModule),
            },
        ]),
    ],
})
export class WebShellModule {}
