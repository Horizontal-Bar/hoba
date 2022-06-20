import { Injectable } from "@angular/core";
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { BehaviorSubject, from, Observable, Subject, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccelerometerService {
    private accelHandler: PluginListenerHandle | null = null;

    private _accelData$ = new Subject();

    get accelData$() {
        return this.listenAcceleration$();
    }

    state$ = new BehaviorSubject<string>('stopped');

    constructor() { }

    listenAcceleration$(): Observable<any> {
        return from(this._listenAcceleration()).pipe(switchMap(() => this._accelData$));
    }

    // Stop the acceleration listener
    stopAcceleration() {
        if (this.accelHandler) {
            this.state$.next('stopped');
            this.accelHandler.remove();
            this.accelHandler = null;
        }
    };

    // Remove all listeners
    removeListeners() {
        this.state$.next('stopped');
        Motion.removeAllListeners();
    };

    private async _listenAcceleration(): Promise<PluginListenerHandle | null> {
        if (!this.accelHandler) {
            this.state$.next('init');
            try {
                await (DeviceMotionEvent as any).requestPermission();
                this.state$.next('granted');
                return Motion.addListener('accel', event => {
                    this.state$.next('pending');
                    this._accelData$.next(event);
                    console.log('Device motion event:', event);
                }).then(listener => {
                    this.accelHandler = listener;
                    return this.accelHandler;
                });
            } catch (e) {
                this.state$.next('error');
                // Handle error
                console.error(e);
                return Promise.resolve(null);
              }
        }
        return Promise.resolve(this.accelHandler);
    }
}