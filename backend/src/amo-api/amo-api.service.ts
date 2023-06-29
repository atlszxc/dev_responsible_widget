import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Config } from 'src/const/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AmoApiService {
    constructor(
        private readonly userService: UserService
    ) {}

    async refreshAccessToken (id: string) {
        const user = await this.userService.getUser(id)
        const response = await axios.post(`https://${user.subdomine}/oauth2/access_token`, {
                client_id: Config.client_id,
                client_secret: Config.client_secret,
                grant_type: Config.grant_type,
                redirect_uri: Config.redirect_uri,
            })

        await this.userService.updateUserToken(user.subdomine, response.data.access_token, response.data.refresh_token)
    }

    async requestAccessToken(subdomine: string, code: string) {
        try {
         const response = await axios.post(`https://${subdomine}/oauth2/access_token`, {
            client_id: Config.client_id,
            client_secret: Config.client_secret,
            grant_type: Config.grant_type,
            redirect_uri: Config.redirect_uri,
            code,
         })
 
 
         return response.data
        } catch (error) {
         console.log(error)
        }
    }

    async getUserData(subdomine: string, token: string) {
        try {
            const response = await axios.get(`https://${subdomine}/api/v4/account`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
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

    async updateDeals(subdomine: string, token: string, deaslResult: any) {
        await axios.patch(`https://${subdomine}/api/v4/leads`, [].concat(deaslResult), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}