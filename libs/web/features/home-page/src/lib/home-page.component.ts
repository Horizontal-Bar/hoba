import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from './services/socket.service';
import {ApiService} from './services/api.service';
import {ToastController} from '@ionic/angular';
import {AccelerometerService} from '@hoba/web/shared/accelerometer';
import { take } from 'rxjs';

// TODO: страница и сервисы просто для примера
@Component({
    selector: 'hoba-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
    constructor(
        private readonly toastController: ToastController,
        private readonly apiService: ApiService,
        private readonly socketService: SocketService,
        public readonly accelerometerService: AccelerometerService
    ) {}

    pingApi() {
        this.apiService.ping().subscribe(message => this.showToast(message));
    }

    pingWs() {
        this.socketService.ping().subscribe(message => this.showToast(message));
    }

    listenAccel() {
        this.accelerometerService.listenAcceleration$().pipe(take(1)).subscribe();
    }

    private async showToast(message: string) {
        const toast = await this.toastController.create({message});
        await toast.present();
    }
}
