import { Injectable } from '@nestjs/common';
import { Manager } from 'src/manager/manager.model';
import { ManagerService } from 'src/manager/manager.service';
import { AlgorithmType } from 'src/template/template.controller';
import { TemplateDocument } from 'src/template/template.model';
import { TemplateService } from 'src/template/template.service';


@Injectable()
export class AlgorithmService {
    constructor (
        private readonly managerService: ManagerService,
        private readonly templateService: TemplateService
    ) {}

    public async createTrigger(triggerId: string, template: TemplateDocument) {
        const trigger = await this.templateService.createTrigger(triggerId, template._id.toString())
        for (const manager of template.managers) {
            await this.templateService.createManagerTrigger(trigger.id, manager.managerId, template._id.toString())
        }

        return trigger
    }

    public async updateTemplateManager(template: TemplateDocument, manager: Manager, algorithmType: string): Promise<void> {
        if(algorithmType === AlgorithmType.COUNT) {
            for (const item of template.managers) {
                if(item.managerId === manager.managerId) {
                   this.managerService.updateCount(manager.managerId, template._id, manager.count)
                }
            }
        }
        if(algorithmType === AlgorithmType.PERCENT) {
            for (const item of template.managers) {
                if(item.managerId === manager.managerId) {
                   this.managerService.updateCurrentPercentCount(manager.managerId, template._id.toString())
                }
            }
        }
    }
}
