import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { UserQueue } from "./queueTemplate";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Logger } from "winston";
import { UserService } from "src/user/user.service";

@Injectable()
export class QueueFactory {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService
    ) {
        this.queues = []
        const usersIds = this.userService.gerUsersIds()
        usersIds.then(res => {
            res.forEach(id => {
                this.add(id)
            })
        })
    }

    private queues: UserQueue[]

    @Cron(CronExpression.EVERY_5_SECONDS)
    public checkQueues() {
        this.logger.info('Start check queues')
        this.queues.forEach(queue => queue.run())
    }

    public deleteQueue(id: string): void {
        this.queues = this.queues.filter(queue => queue.getId() !== id)
        this.logger.info(`Queue ${id} deleted`)
    }

    public findQueue(id: string): UserQueue {
        return this.queues.find(queue => queue.getId() === id)
    }

    public add(id: string): void {
        const queue = new UserQueue(this.logger, id)
        this.queues.push(queue)
        this.logger.info(`Queue ${id} created`)
    }
}
