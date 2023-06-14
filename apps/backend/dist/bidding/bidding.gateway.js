"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddingGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let BiddingGateway = class BiddingGateway {
    constructor() {
        this.logger = new common_1.Logger("AppGateway");
    }
    afterInit(server) {
        this.logger.log("Init");
    }
    handleConnection(client) {
        this.logger.log("Connected");
    }
    handleDisconnect(client) {
        this.logger.log("Disconnected");
    }
    handleMessage(client, payload) {
        this.server.emit("offerToClient", payload, client.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BiddingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("offerToServer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], BiddingGateway.prototype, "handleMessage", null);
BiddingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, { cors: true })
], BiddingGateway);
exports.BiddingGateway = BiddingGateway;
//# sourceMappingURL=bidding.gateway.js.map