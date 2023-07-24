import { Logger } from "winston";

interface IQueueService {
    setAlgorithm(...args: unknown[]): Promise<void>
}

type QueueItem = {
    service: IQueueService,
    args: unknown[]
}

export class UserQueue {
    constructor(
        private logger: Logger,
        id: string
    ) {
        this.queue = []
        this.status = true
        this.id = id
    }

    private id: string
    private queue: QueueItem[]
    private status: boolean

    public add(item: QueueItem): void { 
        this.queue.push(item)
    }

    public getId(): string {
        return this.id
    }

    public async run(): Promise<void> {
        if(this.queue.length && this.status) {
            this.logger.info(`${this.id}: start execute algorithms`)
            this.status = false
            while(this.queue.length > 0) {
                const item = this.queue.shift()
                await item.service.setAlgorithm(...item.args)
            }
            this.logger.info(`${this.id}: algorithms executed`)
            this.status = true
        }
    }
}

