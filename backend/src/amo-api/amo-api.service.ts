import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Config } from 'src/const/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AmoApiService {
    constructor(
        private readonly userService: UserService
    ) {}



    private async refreshAccessToken (subdomine: string) {
        const response = await axios.post(`https://${subdomine}/oauth2/access_token`, {
                client_id: Config.client_id,
                client_secret: Config.client_secret,
                grant_type: Config.grant_type,
                redirect_uri: Config.redirect_uri,
            })

        await this.userService.updateUserToken(subdomine, response.data.access_token, response.data.refresh_token)
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
            error = error as AxiosError
            if(axios.isAxiosError(error) && error.code === '401') {
                this.refreshAccessToken(subdomine)
            }
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
            error = error as AxiosError
            if(axios.isAxiosError(error) && error.code === '401') {
                this.refreshAccessToken(subdomine)
            }
            console.log(error)
        }
    }

    async getManagers(subdomine: string, token: string) {
        try {
            const response = await axios.get(`https://${subdomine}/api/v4/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            error = error as AxiosError
            if(axios.isAxiosError(error) && error.code === '401') {
                this.refreshAccessToken(subdomine)
            }
            console.log(error)
        }
    }

    async getDeals(subdomine: string, token: string) {
        try {
            const response = await axios.get(`https://${subdomine}/api/v4/leads`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            error = error as AxiosError
            if(axios.isAxiosError(error) && error.code === '401') {
                this.refreshAccessToken(subdomine)
            }
            console.log(error)
        }
    }

    async updateDeals(subdomine: string, token: string, deaslResult: any) {
        try {
            await axios.patch(`https://${subdomine}/api/v4/leads`, [].concat(deaslResult), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            error = error as AxiosError
            if(axios.isAxiosError(error) && error.code === '401') {
                this.refreshAccessToken(subdomine)
            }
            console.log(error)
        }
    }
}