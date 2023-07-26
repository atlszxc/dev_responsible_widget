import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'
import { AmoApiService } from "src/amo-api/amo-api.service";
import { TemplateService } from "src/template/template.service";
import { UserService } from "src/user/user.service";
import { AlgorithmService } from "./algorithm.service";
import { WSPORT } from "src/const/config";

type ConnectedUser = {
    socketId: string,
    managerId: string | string[]
}

@WebSocketGateway(WSPORT, { transports: ['websocket', 'polling'], cors: '*:*' })
export class RoundsAlgorithm implements OnModuleInit {
    constructor(
        private readonly templateService: TemplateService,
        private readonly amoApiService: AmoApiService,
        private readonly userService: UserService,
        private readonly algorithmService: AlgorithmService
    ) {
        this.isDealAccept = false
        this.connectedUsers = []
    }

    @WebSocketServer()
    server: Server

    private isDealAccept: boolean
    private connectedUsers: ConnectedUser[]

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(`Client: ${socket.id} connected`)
            this.connectedUsers.push({
                socketId: socket.id,
                managerId: socket.handshake.query.managerId
            })

            socket.on('disconnect', () => {
                this.connectedUsers = this.connectedUsers.filter(user => user.socketId !== socket.id)
            })
        })
    }

    /*
        Полная логика отпраки сообщения менеджеру будет доделана, когда будут исправлены поля ввода времени на клиенте
    */

    public async setAlgorithm(templateId: string, dealId: string, triggerId: string): Promise<void> {
        const template = await this.templateService.getTemplate(templateId)
        const user = await this.userService.getUser(template.userId)
        const deal = await this.amoApiService.getDeal(user.subdomain, user.access_token, user.refresh_token, dealId)
        let trigger = await this.templateService.getTrigger(triggerId)
        if(!trigger) {
            trigger = await this.algorithmService.createTrigger(triggerId, template)
        }

        for(let i = 0; i < template.rounds; i++) {
            if(this.isDealAccept) {
                break
            }

            const { socketId } = this.connectedUsers.find(user => Number(user.managerId) === template.managers[trigger.currentRoundsIdx].managerId)
            this.server.to(socketId).emit('newDeal', deal)
            if(trigger.currentRoundsIdx === template.managers.length - 1) {
                trigger.currentRoundsIdx = 0
            } else {
                trigger.currentRoundsIdx++
            }
            await trigger.save()
        }

        this.isDealAccept = true
    }

    /*
        Полная логика принятия сделки будет реализована, когда будет реализван компонент и функционал принятия сделки на клиенте
    */

    @SubscribeMessage('taskAccepted')
    public async onAcceptedTask(@MessageBody() data: any): Promise<void> {
        this.isDealAccept = true
    }

}