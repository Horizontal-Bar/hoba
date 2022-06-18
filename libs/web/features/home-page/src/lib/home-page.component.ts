import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SocketService} from './services/socket.service';
import {ApiService} from './services/api.service';
import {ToastController} from '@ionic/angular';

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
    ) {}

    pingApi() {
        this.apiService.ping().subscribe(message => this.showToast(message));
    }

    pingWs() {
        this.socketService.ping().subscribe(message => this.showToast(message));
    }

    private async showToast(message: string) {
        const toast = await this.toastController.create({message});
        await toast.present();
    }
}
