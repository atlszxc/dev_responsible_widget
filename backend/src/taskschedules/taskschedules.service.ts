import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios';
import { CronJob } from 'cron';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskschedulesService {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private readonly userService: UserService
    ) {}

    createtestTask = (time: number) => {
        console.log(`task work every ${time} seconds`)
    }

    refreshAccessTokenTask = async (id: string) => {
        const user = await this.userService.getUser(id)
        const response = await axios.post(`https://${user.subdomine}/oauth2/access_token`, {
            client_id: 'ba7b8297-93f9-4c7b-a895-b35edb724d5b',
            client_secret: 'ixbCGP1Ik4hLtA2ixbG8d9nUu3HW1sQkkYym6OVwZrUYJb6McodvUIlay1uT4KN7',
            grant_type: 'authorization_code',
            redirect_uri: 'https://21f2-77-95-92-110.eu.ngrok.io/api/auth/',
        })

        await this.userService.updateUserToken(user.subdomine, response.data.access_token, response.data.refresh_token)
    }

    //subdomine: string, id: string
    createTask = (time: number, name: string, subdomine: string) => {
        const job = new CronJob(`* * 0/24 * * *`, async () => {
            console.log(`Task work every ${time} seconds`)
            const response = await axios.post(`https://${subdomine}/oauth2/access_token`, {
                client_id: 'ba7b8297-93f9-4c7b-a895-b35edb724d5b',
                client_secret: 'ixbCGP1Ik4hLtA2ixbG8d9nUu3HW1sQkkYym6OVwZrUYJb6McodvUIlay1uT4KN7',
                grant_type: 'authorization_code',
                redirect_uri: 'https://21f2-77-95-92-110.eu.ngrok.io/api/auth/',
            })

            await this.userService.updateUserToken(subdomine, response.data.access_token, response.data.refresh_token)
        })

        this.schedulerRegistry.addCronJob(name, job)
        job.start()
    }
}
