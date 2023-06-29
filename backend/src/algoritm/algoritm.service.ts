import { Injectable } from '@nestjs/common';
import { AmoApiService } from 'src/amo-api/amo-api.service';
import { Template } from 'src/template/template.model';
import { uniqBy } from 'lodash'
import { Manager } from 'src/manager/manager.model';
import { ManagerService } from 'src/manager/manager.service';

@Injectable()
export class AlgoritmService {
    constructor (
        private readonly amoApiService: AmoApiService,
        private readonly managerService: ManagerService
    ) {}

    async queueAlgoritm(template: Template) {
        try {
            const deals = await this.amoApiService.getDeals(template.user.subdomine, template.user.access_token)

            const managers = await this.amoApiService.getManagers(template.user.subdomine, template.user.access_token)
            const managerData = managers._embedded.users.filter(manager => manager.rights.is_active === true).map(item => ({
                managerId: item.id,
                name: item.name,
                percent: 0,
                count: 0,
                user: template.user
            }))

            for (const manager of template.managers) {
                const hasManager = managerData.find(item => item.managerId === manager.managerId)
                if(!hasManager) {
                    await this.managerService.deleteManager(manager.id)
                }
            }

            template.managers.concat(managerData)
            template.managers = uniqBy(template.managers, (manager: Manager) => manager.managerId)

            await this.managerService.createManagers(template.managers)
 
            let idx = 0
            const deaslResult = []
            for (const deal of deals._embedded.leads) {
                deaslResult.push({ id: deal.id,  responsible_user_id: Number(template.managers[idx].managerId)})
                idx + 1 > template.managers.length - 1 ? idx = 0 : idx += 1  
            }

            await this.amoApiService.updateDeals(template.user.subdomine, template.user.access_token, deaslResult)

        } catch (error) {
            console.log(error)
        }
    }
}
