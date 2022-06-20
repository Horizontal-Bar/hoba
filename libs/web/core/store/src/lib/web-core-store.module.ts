import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';

@NgModule({
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),

        StoreDevtoolsModule.instrument(),

        StoreModule.forFeature('router', routerReducer),
        StoreRouterConnectingModule.forRoot(),
    ],
})
export class WebCoreStoreModule {}
