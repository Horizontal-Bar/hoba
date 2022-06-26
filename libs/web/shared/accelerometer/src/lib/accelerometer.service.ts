import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, distinctUntilChanged, from, shareReplay, switchMap, throttleTime } from "rxjs";
import { needToInverseAxes } from "./utils";

@Injectable({
    providedIn: 'root'
})
export class AccelerometerService {

    private internalState$ = new BehaviorSubject<DeviceMotionEvent | null>(null);

    get state$() {
        return this.internalState$.pipe(shareReplay(1), distinctUntilChanged(), throttleTime(40));
    }

    isReverseAxes = needToInverseAxes();

    accelActive$ = new BehaviorSubject(false);

    listenAcceleration$() {
        if (this.accelActive$.value) {
            return this.state$;
        }
        this.accelActive$.next(true);
        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {

            const requestPermissionState = (DeviceMotionEvent as any).requestPermission() as Promise<string>;

            // requestPermissionState.then(st => {
            //     alert(st);
            // })

            return from(requestPermissionState.then(state => {
                if (state === 'granted') {
                    this.startListen();
                }

                return state;
            })).pipe(
                switchMap(() => {
                    return this.state$;
                }),
                catchError(err => {
                    console.error(err);
                    this.accelActive$.next(false);
                    this.stopListen();

                    return this.state$;
                })
            );
        } else {
            this.startListen();

            return this.state$;
        }
    }

    stopListenAcceleration() {
        console.log('stop it!');
        this.stopListen();
        this.accelActive$.next(false);
    }

    private handleMotionEvent = (event: DeviceMotionEvent) => {
        this.internalState$.next(event);
    }

    private startListen() {
        window.addEventListener('devicemotion', this.handleMotionEvent, true);
    }

    private stopListen() {
        window.removeEventListener('devicemotion', this.handleMotionEvent, true);
        this.internalState$.next(null);
    }
}
