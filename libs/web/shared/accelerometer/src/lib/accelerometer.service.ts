import { Injectable } from "@angular/core";
import { DeviceMotionAccelerometerOptions } from '@awesome-cordova-plugins/device-motion/ngx';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccelerometerService {

    private hasListener = false;

    accel$ = new Subject();

    constructor() { }

    listenAcceleration$() {
        if (!this.hasListener) {
            this.accel$.next(new DeviceMotionEvent('devicemotion'));
            window.addEventListener('devicemotion', this.motionFn);
            this.hasListener = true;
        }
        return this.accel$;
    }

    stopListenAcceleration() {
        window.removeEventListener('devicemotion', this.motionFn);
    }

    private motionFn = (event: any) => {
        console.log(event.acceleration.x + ' m/s2');
        this.accel$.next(event);
    }
}