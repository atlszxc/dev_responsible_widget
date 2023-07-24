import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AmoApiService } from 'src/amo-api/amo-api.service';
import { UserDocument } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly amoApiService: AmoApiService
    ) {}

    public async signUpUser(subdomain: string, code: string): Promise<UserDocument> {
        try {
            const tokenData = await this.amoApiService.requestAccessToken(subdomain, code)
            if(tokenData) {
                const userData = await this.amoApiService.getUserData(subdomain, tokenData.access_token, tokenData.refresh_token)
                if(userData) {
                    const user = await this.userService.createUser({
                        id: userData.id,
                        access_token: tokenData.access_token,
                        refresh_token: tokenData.refresh_token,
                        subdomain,
                        code,
                        templates: [] 
                    })

                    return user
                } else {
                    throw new HttpException('Запрос на получение данных пользователя успешно проебан)', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                throw new HttpException('Запрос на получение токена субдомена успешно проебан)', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
        
}
