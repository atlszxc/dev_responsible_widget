import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from './template.model';
import { Repository } from 'typeorm';
import { ManagerService } from 'src/manager/manager.service';
import { AlgoritmService } from 'src/algoritm/algoritm.service';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
        private readonly managerService: ManagerService,
        private readonly algoritmService: AlgoritmService
    ) {}

    getTemplates = async (userId: string) => {
        return await this.templateRepository.find({ 
            where: { 
                user: {
                    id: userId
                } 
            },
            relations: {
                managers: true
            } 
        })
    }

    getTemplate = async (id: string) => {
        return await this.templateRepository.findOne({ where: { id } })
    }

    createTemplate = async (data: Template) => {
        const managersDB = []
        for (const manager of data.managers) {
            const managerData = await this.managerService.getManager(Number(manager.id))
            managersDB.push(managerData)
        }

        await this.templateRepository.save({
            alghoritm: data.alghoritm,
            user: data.user,
            rounds: data.rounds,
            title: data.title,
            timeAcceptDeal: data.timeAcceptDeal,
            managers: managersDB
        })
    }

    setTemplate = async (id: string) => {
        const template = await this.templateRepository.findOne({ 
            where: { id },
            relations: {
                managers:true,
                user: true
            }
        })


        await this.algoritmService.queueAlgoritm(template)
    }

    deleteTemplate = async (id: string) => {
        await this.templateRepository.delete({ id })
    }
}
