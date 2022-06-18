import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {map, Subject, take} from 'rxjs';
import {PingResponse} from "@hoba/shared/interfaces";

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private readonly host = 'http://localhost:5555';
    private readonly socket = io(this.host);

    readonly event$ = new Subject<PingResponse>();

    constructor() {
        this.socket.connect();

        this.socket.on('pong', response => this.event$.next(response));
    }

    ping() {
        this.socket.emit('ping');

        return this.event$.pipe(take(1), map(response => response.message));
    }
}
