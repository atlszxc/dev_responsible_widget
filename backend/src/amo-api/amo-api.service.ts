import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AmoApiService {
    constructor(
        private readonly userService: UserService
    ) {}

    async refreshAccessToken (id: string) {
        const user = await this.userService.getUser(id)
        const response = await axios.post(`https://${user.subdomine}/oauth2/access_token`, {
                client_id: 'ba7b8297-93f9-4c7b-a895-b35edb724d5b',
                client_secret: 'ixbCGP1Ik4hLtA2ixbG8d9nUu3HW1sQkkYym6OVwZrUYJb6McodvUIlay1uT4KN7',
                grant_type: 'authorization_code',
                redirect_uri: 'https://54d3-77-95-92-110.eu.ngrok.io/api/auth/',
            })

        await this.userService.updateUserToken(user.subdomine, response.data.access_token, response.data.refresh_token)
    }

    async requestAccessToken(subdomine: string, code: string) {
        try {
         const response = await axios.post(`https://${subdomine}/oauth2/access_token`, {
             client_id: 'ba7b8297-93f9-4c7b-a895-b35edb724d5b',
             client_secret: 'ixbCGP1Ik4hLtA2ixbG8d9nUu3HW1sQkkYym6OVwZrUYJb6McodvUIlay1uT4KN7',
             grant_type: 'authorization_code',
             redirect_uri: 'https://54d3-77-95-92-110.eu.ngrok.io/api/auth/',
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
}