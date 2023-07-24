import { Injectable } from '@nestjs/common';
import { AmoApiService } from 'src/amo-api/amo-api.service';
import { AlgorithmService } from './algorithm.service';
import { UserService } from 'src/user/user.service';
import { TemplateService } from 'src/template/template.service';

@Injectable()
export class CountAlgorithmService {
    constructor (
        private readonly amoApiService: AmoApiService,
        private readonly userService: UserService,
        private readonly algorithmService: AlgorithmService,
        private readonly templateService: TemplateService,
    ) { }

    public async setAlgorithm(templateId: string, dealId: string, triggerId: string): Promise<void> {
        const template = await this.templateService.getTemplate(templateId)
        const user = await this.userService.getUser(template.userId)
        const deal = await this.amoApiService.getDeal(user.subdomain, user.access_token, user.refresh_token, dealId)
        const trigger = await this.templateService.getTrigger(triggerId)

        if(trigger) {
            for (const manager of template.managers) {
                const triggerManagerData = await this.templateService.getTriggerManager(manager.managerId, triggerId)
                if(triggerManagerData.count < triggerManagerData.maxCount) {
                    await this.amoApiService.updateDeals(
                        user.subdomain, 
                        user.access_token, 
                        { id: deal.id, responsible_user_id: manager.managerId }, 
                        user.refresh_token
                    )

                    triggerManagerData.count++
                    await triggerManagerData.save()

                    break
                }
            }
        } else {
            await this.algorithmService.createTrigger(triggerId, template)
            const triggerManagerData = await this.templateService.getTriggerManager(template.managers[0].managerId, triggerId)
            await this.amoApiService.updateDeals(
                user.subdomain,
                user.access_token,
                { id: deal.id, responsible_user_id: template.managers[0].managerId },
                user.refresh_token
            )

            triggerManagerData.count++
            await triggerManagerData.save()
        }

        const triggerManagerData = await this.templateService.getTriggerManager(template.managers[template.managers.length - 1].managerId, triggerId)

        if(triggerManagerData.count === triggerManagerData.maxCount) {
            console.log('clear counts')
            await this.templateService.clearTriggerManagers(triggerId)
        }
    }
}
