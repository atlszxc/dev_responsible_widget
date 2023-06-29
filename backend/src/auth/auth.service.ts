import { Injectable } from '@nestjs/common';
import { AmoApiService } from 'src/amo-api/amo-api.service';
import { ManagerService } from 'src/manager/manager.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly managerService: ManagerService,
        private readonly amoApiService: AmoApiService
    ) {}

    async signUpUser(subdomine: string, code: string) {
        try {
            const tokenData = await this.amoApiService.requestAccessToken(subdomine, code)
            const userData = await this.amoApiService.getUserData(subdomine, tokenData.access_token)
           
            const user = await this.userService.createUser({ 
                id: userData.id, 
                subdomine,
                name: userData.name, 
                access_token: tokenData.access_token, 
                refresh_token: tokenData.refresh_token,
                expires_in: tokenData.expires_in, 
            })
            
            const managers = await this.amoApiService.getManagers(subdomine, tokenData.access_token)
            const managersData = managers._embedded.users.filter(manager => manager.rights.is_active === true).map(item => ({
                managerId: item.id,
                name: item.name,
                percent: 0,
                count: 0,
                user
            }))
    
            await this.managerService.createManagers(managersData)

            return user
        } catch (error) {
            console.log(error)
        }
    }
}
