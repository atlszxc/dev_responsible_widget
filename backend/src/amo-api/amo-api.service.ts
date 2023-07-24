import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Config } from 'src/const/config';
import { UserService } from 'src/user/user.service';
import { AmoManager, DealsResult, Lead, Leads, ResponseTokenData } from './amo-api.types';
import { Logger } from 'winston';

enum RequestTypes {
    GET = 'get',
}

enum Endpoints {
    USER = 'user',
    LEADS = 'leads',
    ACCOUNT = 'account'
}

@Injectable()
export class AmoApiService {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        private readonly userService: UserService
    ) {}
    
    private async apiRequest(subdomain: string, token: string, type: string, endpoint: string): Promise<AxiosResponse> {
        return await axios[type](`https://${subdomain}/api/v4/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    private async refreshAccessToken (subdomain: string, refresh_token: string): Promise<string> {
        try {
            const response = await axios.post(`https://${subdomain}/oauth2/access_token`, {
                client_id: Config.client_id,
                client_secret: Config.client_secret,
                grant_type: 'refresh_token',
                refresh_token,
            })
            await this.userService.updateAccessTokens(subdomain, response.data.access_token, response.data.refresh_token)
            return response.data.access_token
        } catch (error) {
            error = error as AxiosError
            if(axios.isAxiosError(error)) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
        }
    }

    public async requestAccessToken(subdomain: string, code: string): Promise<ResponseTokenData> {
        try {
         const response = await axios.post(`https://${subdomain}/oauth2/access_token`, {
            client_id: Config.client_id,
            client_secret: Config.client_secret,
            grant_type: Config.grant_type,
            redirect_uri: Config.redirect_uri,
            code,
         })
 
 
         return response.data
        } catch (error) {
            console.log(error)
            error = error as AxiosError
            if(axios.isAxiosError(error) && error.code === '401') {
                await this.refreshAccessToken(subdomain, code)
            }
        }
    }

    //Не забыть описать тип возвращаемого значения
    public async getUserData(subdomain: string, token: string, refresh_token: string) {
        try {
            const response = await this.apiRequest(subdomain, token, RequestTypes.GET, Endpoints.ACCOUNT)

            return response.data
        } catch (error) {
            const newToken = await this.refreshAccessToken(subdomain, refresh_token)
            const response = await this.apiRequest(subdomain, newToken, RequestTypes.GET, Endpoints.ACCOUNT)
            return response.data
        }
    }

    public async getManagers(subdomain: string, token: string, refresh_token: string): Promise<AmoManager[]> {
        try {
            const response = await this.apiRequest(subdomain, token, RequestTypes.GET, Endpoints.USER)
            return response.data._embedded.users
        } catch (error) {
            error = error as AxiosError

            if(error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Too Many Requests`)
                const response = await this.getManagers(subdomain, token, refresh_token)
                return response
            }

            if(error.response.status === HttpStatus.UNAUTHORIZED) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Unauthorized`)
                const newToken = await this.refreshAccessToken(subdomain, refresh_token)
                const response = await this.getManagers(subdomain, newToken, refresh_token)
                return response
            }
        }
    }

    public async getDeals(subdomain: string, token: string, refresh_token: string): Promise<Leads> {
        try {
            const response = await this.apiRequest(subdomain, token, RequestTypes.GET, Endpoints.LEADS)       
            return response.data
        } catch (error) {
            error = error as AxiosError

            if(error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Too Many Requests`)
                const response = await this.getDeals(subdomain, token, refresh_token)
                return response
            }

            if(error.response.status === HttpStatus.UNAUTHORIZED) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Unauthorized`)
                const newToken = await this.refreshAccessToken(subdomain, refresh_token)
                const response = await this.apiRequest(subdomain, newToken, RequestTypes.GET, Endpoints.LEADS)
                return response.data
            }
        }
    }

    public async getDeal(subdomain: string, token: string, refresh_token: string, id: string): Promise<Lead> {
        try {
            const response = await axios.get(`https://${subdomain}/api/v4/leads/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            error = error as AxiosError
            
            if(error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Too Many Requests`)
                console.log(`Amo api error with status: ${error.response.status}, Too Many Requests`)
                const response = await this.getDeal(subdomain, token, refresh_token, id)
                return response
            }

            if(error.response.status === HttpStatus.UNAUTHORIZED) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Unauthorized`)
                const newToken = await this.refreshAccessToken(subdomain, refresh_token)
                const response = await this.getDeal(subdomain, newToken, refresh_token, id)
                return response
            }
        }
    }

    public async updateDeals(subdomain: string, token: string, dealsResult: DealsResult, refresh_token: string): Promise<void> {
        try {
            this.logger.debug('Start get deal')
            await axios.patch(`https://${subdomain}/api/v4/leads`, [].concat(dealsResult), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.logger.debug('End get deal')
        } catch (error) {
            error = error as AxiosError

            if(error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Too Many Requests`)
                const response = await this.updateDeals(subdomain, token, dealsResult, refresh_token)
                return response
            }

            if(error.response.status === HttpStatus.UNAUTHORIZED) {
                this.logger.error(`Amo api error with status: ${error.response.status}, Unauthorized`)
                const newToken = await this.refreshAccessToken(subdomain, refresh_token)
                const response = await this.updateDeals(subdomain, newToken, dealsResult, refresh_token)
                return response
            }
        }
    }
}
