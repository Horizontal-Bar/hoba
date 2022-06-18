import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {PingResponse} from "@hoba/shared/interfaces";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly host = '/api';

    constructor(private readonly http: HttpClient) {}

    ping() {
        return this.http
            .get<PingResponse>(this.host + '/ping')
            .pipe(map(response => response.message));
    }
}
