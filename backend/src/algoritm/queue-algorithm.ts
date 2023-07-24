import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AmoApiService } from "src/amo-api/amo-api.service";
import { DealsResult } from "src/amo-api/amo-api.types";
import { TemplateDocument } from "src/template/template.model";
import { TemplateService } from "src/template/template.service";
import { Trigger, TriggerDocument } from "src/template/trigger.model";
import { User } from "src/user/user.model";
import { UserService } from "src/user/user.service";

@Injectable()
export class QueueAlgoritmService {
    constructor (
        private readonly amoApiService: AmoApiService,
        private readonly userService: UserService,
        private readonly templateService: TemplateService
    ) {}

    private async updateDeal(template: TemplateDocument, user: User, dealData: DealsResult, trigger: TriggerDocument): Promise<void> {
        await this.amoApiService.updateDeals(
            user.subdomain,
            user.access_token,
            dealData,
            user.refresh_token
        )

        if(trigger.currentQueueIdx < template.managers.length - 1) {
            trigger.currentQueueIdx++
            await trigger.save()
        } else {
            trigger.currentQueueIdx = 0
            await trigger.save()
        }
    }
 
    public async setAlgorithm(templateId: string, dealId: string, triggerId: string): Promise<void> {
        try {
            console.log(triggerId)
            const template = await this.templateService.getTemplate(templateId)
            const user = await this.userService.getUser(template.userId)
            const deal = await this.amoApiService.getDeal(user.subdomain, user.access_token, user.refresh_token, dealId)

            const trigger = await this.templateService.getTrigger(triggerId)
            
            if(trigger) {
                if(trigger.currentQueueIdx < template.managers.length - 1) {
                    const dealsResult: DealsResult = { id: deal.id, responsible_user_id: template.managers[trigger.currentQueueIdx + 1].managerId }
                    await this.updateDeal(template, user, dealsResult, trigger)
                } else {
                    const dealsResult: DealsResult = {id: deal.id, responsible_user_id: template.managers[0].managerId}
                    await this.updateDeal(template, user, dealsResult, trigger)
                }
            } else {
                await this.templateService.createTrigger(triggerId, template._id.toString())
                await this.amoApiService.updateDeals(
                    user.subdomain, 
                    user.access_token, 
                    { id: deal.id, responsible_user_id: template.managers[0].managerId}, 
                    user.refresh_token
                )
    
            }

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}