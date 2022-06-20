import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {Logger} from '@nestjs/common';
import {PingResponse} from "@hoba/shared/interfaces";

@WebSocketGateway({cors: true})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    private logger = new Logger('AppGateway');

    @SubscribeMessage('ping')
    handleMessage(client: Socket, payload: string): void {
        const response: PingResponse = {message: '[ws] pong'};

        this.server.emit('pong', response);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
