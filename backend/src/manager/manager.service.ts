import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './manager.model';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Template } from 'src/template/template.model';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>,
    ) {}

    async deleteManager(id: string) {
        await this.managerRepository.delete({ id })
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
