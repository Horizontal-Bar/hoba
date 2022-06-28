import {Body, Controller, Post} from '@nestjs/common';
import {LoginDto, LoginResponse} from '@hoba/shared/interfaces';

import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginService: AuthService) {}

    @Post('login')
    login(@Body() dto: LoginDto): Promise<LoginResponse> {
        return this.loginService.login(dto);
    }
}
