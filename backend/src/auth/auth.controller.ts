import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ROOT_ROUTES } from 'src/const/rootRoutes';
import { UserDocument } from 'src/user/user.model';

@Controller(ROOT_ROUTES.AUTH)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Get('/')
    public async auth(@Query() query: AuthDto): Promise<UserDocument> {
        try {
            console.log(query)
            return await this.authService.signUpUser(query.referer, query.code)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
