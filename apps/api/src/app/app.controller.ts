import {Body, Controller, Get, Post} from '@nestjs/common';
import {LoginDto, LoginResponse, PingResponse} from '@hoba/shared/interfaces';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';

@Controller()
export class AppController {
    constructor(private readonly loginService: LoginService) {}

    @Get('ping')
    ping(): PingResponse {
        return {message: '[api] pong'};
    }

    @Post('auth/login')
    login(@Body() dto: LoginDto): Observable<LoginResponse> {
        return this.loginService.login(dto);
    }
}
