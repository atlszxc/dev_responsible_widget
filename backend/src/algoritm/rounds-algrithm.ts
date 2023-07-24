import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'

type ConnectedUser = {
    socketId: string,
    managerId: string | string[]
}

@WebSocketGateway(8080, { transports: ['websocket', 'polling'], cors: '*:*' })
export class RoundsAlgorithm implements OnModuleInit {
    constructor() {
        this.connectedUsers = []
    }

    @WebSocketServer()
    server: Server

    private isAccepted: boolean
    private connectedUsers: ConnectedUser[]

    onModuleInit() {
        this.isAccepted = false
        this.server.on('connection', (socket) => {
            console.log(socket.handshake.query)
            console.log(`Client: ${socket.id} connected`)
            this.connectedUsers.push({
                socketId: socket.id,
                managerId: socket.handshake.query.managerId
            })

        })
    }

    @SubscribeMessage('newTask')
    onNewTask(@MessageBody() data: any) {
        console.log(data)
        const time = data.template.timeAcceptDeal.split(':')
        for(let i = 0; i < data.template.rounds; i++) {
            if(this.isAccepted) {
                break
            }

            data.template.managers.forEach(manager => {
                this.connectedUsers.forEach(user => {
                    if(manager.managerId == user.managerId) {
                        this.server.to(user.socketId).emit('onNewTask', {
                            data
                        })
                    }
                })
            })

            // setTimeout(() => {
            //     this.server.emit('onNewTask', {
            //         data
            //     })
            // }, time[0] * 60 * 1000 + time[1] * 1000)
        }
    }

    @SubscribeMessage('taskAccepted')
    onAcceptedTask(@MessageBody() data: any) {
        console.log(data)
        this.isAccepted = true
    }

}