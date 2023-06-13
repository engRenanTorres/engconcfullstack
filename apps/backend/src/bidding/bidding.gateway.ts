import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, { cors: true })
export class BiddingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }
  handleConnection(client: Socket) {
    this.logger.log('Connected');
  }
  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected');
  }

  @SubscribeMessage('offerToServer')
  handleMessage(client: Socket, payload: number): void {
    //console.log('Hello world!');
    this.server.emit('offerToClient', payload, client.id);
  }
}
