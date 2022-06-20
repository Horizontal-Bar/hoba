import {Controller, Get} from '@nestjs/common';
import {PingResponse} from "@hoba/shared/interfaces";

@Controller()
export class AppController {
    @Get('ping')
    ping(): PingResponse {
        return {message: '[api] pong'};
    }
}
