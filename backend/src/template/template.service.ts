import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateDocument } from './template.model';
import { Model } from 'mongoose';
import { ManagerService } from 'src/manager/manager.service';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { Trigger, TriggerDocument } from './trigger.model';
import { ManagerTemplateDocument, managerTrigger } from './managerTrigger';

@Injectable()
export class TemplateService {
    constructor(
        @InjectModel(Template.name) private readonly templateModel: Model<Template>,
        @InjectModel(Trigger.name) private readonly triggerModel: Model<Trigger>,
        @InjectModel(managerTrigger.name) private readonly managerTriggerModel: Model<managerTrigger>,
        private readonly managerService: ManagerService,
    ) {}

    public async getTemplates(userId: string): Promise<Template[]> {
        try {
            return await this.templateModel.find({ userId }).populate('managers')
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getTemplate(id: string): Promise<TemplateDocument> {
        try {
            return await this.templateModel.findOne({ _id: id }).populate('managers')
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async createTrigger(triggerId: string, templateId: string): Promise<TriggerDocument> {
        try {
            return await new this.triggerModel({ id: triggerId, templateId: templateId }).save()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getTrigger(id: string): Promise<TriggerDocument> {
        return await this.triggerModel.findOne({ id })
    }

    public async getTriggerManager(managerId: number, triggerId: string): Promise<ManagerTemplateDocument> {
        return await this.managerTriggerModel.findOne({ managerId, triggerId })
    }

    public async clearTriggerManagers(triggerId: string): Promise<void> {
        try {
            const triggerManagersData = await this.managerTriggerModel.find({ triggerId })
            for (const triggerData of triggerManagersData) {
                await triggerData.updateOne({
                    $set: {
                        count: 0
                    }
                })
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)    
        }
    }

    public async createManagerTrigger(triggerId: string, managerId: number, templateId: string): Promise<ManagerTemplateDocument> {
        try {
            const manager = await this.managerService.getManager(managerId, templateId)
            return await new this.managerTriggerModel({
                triggerId: triggerId,
                managerId: managerId,
                maxCount: manager.maxCount,
                percent: manager.percent,
            }).save()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async createTemplate(userId: string, data: CreateTemplateDto): Promise<void> {
        try {
            const template = await new this.templateModel({...data, managers: [], userId}).save()
            const templateManagers = data.managers.map(manager => ({ 
                managerId: Number(manager.managerId), 
                count: 0,
                title: manager.title,
                maxCount: manager.count,
                percent: manager.percent,
                currentPercentCount: 0,
                maxPercentCount: 0,
                templateId: String(template._id)
            }))

            const managers = await this.managerService.createManagers(templateManagers)

            await template.updateOne({ $set: {
                managers: managers
            } })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async updateTemplate(id: string, data: CreateTemplateDto): Promise<void> {
        try {
            const template = await this.templateModel.findOne({ _id: id })
            const templateManagers = data.managers.map(manager => ({ 
                managerId: Number(manager.managerId), 
                count: 0,
                title: manager.title,
                maxCount: manager.count,
                percent: manager.percent,
                currentPercentCount: 0,
                maxPercentCount: 0,
                templateId: template._id.toString(),
            }))

            const managers = await this.managerService.createManagers(templateManagers)
            template.updateOne({ 
                $set: {
                    title: data.title,
                    algorithm: data.algorithm,
                    managers: managers
                }
            })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async updateCurrentIdx(id: string, idx: number): Promise<void> {
        await this.templateModel.findOneAndUpdate({ _id: id }, {
            $set: { currentManagerIdx: idx }
        })
    }

    public async deleteTemplate(templateId: string): Promise<void> {
        try {
            const triggers = await this.triggerModel.find({ templateId })
            for (const trigger of triggers) {
                const managerTriggers = await this.managerTriggerModel.find({ triggerId: trigger.id })
                for (const managerTrigger of managerTriggers) {
                    const manager = await this.getTriggerManager(managerTrigger.managerId, trigger.id)
                    await manager.deleteOne({ _id: manager._id })
                    await managerTrigger.deleteOne({ _id: managerTrigger._id })                
                }
                await trigger.deleteOne({ _id: trigger._id })
            }
            await this.templateModel.deleteOne({ _id: templateId })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
