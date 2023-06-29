import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './manager.model';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Template } from 'src/template/template.model';
import { Cron } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>,
        private readonly userService: UserService
    ) {}

    @Cron('0 0/24 * * *')
    async updateManagersTask() {
        const users = await this.userService.getUsers()
        for (const user of users) {
            const managers = await this.getManagers(user.subdomine, user.access_token)

            const managersData = managers._embedded.users.filter(manager => manager.rights.is_active === true).map(item => ({
                managerId: item.id,
                name: item.name,
                percent: 0,
                count: 0,
                user
            }))
    
            await this.createManagers(managersData)
        }
    }

    async getManagers(subdomine: string, token: string) {
        const response = await axios.get(`https://${subdomine}/api/v4/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    }

    async getManager(id: number) {
        return await this.managerRepository.findOne({ where: {
            managerId: id
        } })
    }

    async updateManagerById(id: string, data: Template) {
        const manager = await this.managerRepository.findOne(
            { 
                where: {
                    id
                },
                relations: {
                    templates: true
                } 
            })

            manager.templates.concat(data)
            await this.managerRepository.save(data)

    }

    async createManagers(data: Manager[]) {
        await this.managerRepository.save(data)
    }


}
