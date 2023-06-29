import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Template } from 'src/template/template.model';

@Injectable()
export class AlgoritmService {
    async queueAlgoritm(template: Template) {
        try {
            const deals = await axios.get(`https://${template.user.subdomine}/api/v4/leads`, {
                headers: {
                    Authorization: `Bearer ${template.user.access_token}`
                }
            })

            let idx = 0
            const deaslResult = []
            for (const deal of deals.data._embedded.leads) {
                deaslResult.push({ id: deal.id,  responsible_user_id: Number(template.managers[idx].managerId)})
                idx + 1 > template.managers.length - 1 ? idx = 0 : idx += 1  
            }

            await axios.patch(`https://${template.user.subdomine}/api/v4/leads`, [].concat(deaslResult), {
                headers: {
                    Authorization: `Bearer ${template.user.access_token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
