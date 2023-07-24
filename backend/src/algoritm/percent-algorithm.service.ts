import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AmoApiService } from "src/amo-api/amo-api.service";
import { UserService } from "src/user/user.service";
import { TemplateService } from "src/template/template.service";
import { AlgorithmService } from "./algorithm.service";

@Injectable()
export class PercentAlgorithmService {
    constructor (
        private readonly amoApiService: AmoApiService,
        private readonly userService: UserService,
        private readonly templateService: TemplateService,
        private readonly algorithmService: AlgorithmService
    ) {}

    public async setAlgorithm(templateId: string, dealId: string, triggerId: string): Promise<void> {
        try {
            const template = await this.templateService.getTemplate(templateId)
            const user = await this.userService.getUser(template.userId)
            const deal = await this.amoApiService.getDeal(user.subdomain, user.access_token, user.refresh_token, dealId)
            let trigger = await this.templateService.getTrigger(triggerId)
            if(!trigger) {
                trigger = await this.algorithmService.createTrigger(triggerId, template)
            }

            trigger.totalDeal++
            await trigger.save()

            for (const manager of template.managers) {
                const triggerManagerData = await this.templateService.getTriggerManager(manager.managerId, triggerId)
                if(Math.floor((triggerManagerData.currentPercentCount / trigger.totalDeal) * 100) <= triggerManagerData.percent) {
                    await this.amoApiService.updateDeals(
                        user.subdomain, 
                        user.access_token, 
                        { id: deal.id, responsible_user_id: manager.managerId },
                        user.refresh_token
                    )

                    await triggerManagerData.updateOne({
                        $inc: {
                            currentPercentCount: 1
                        }
                    })

                    break
                }
            }

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}