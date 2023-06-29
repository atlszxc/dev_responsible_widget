import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Get('/')
    async auth(@Query() query: IAuth) {
        console.log(query)
        await this.authService.signUpUser(query.referer, query.code)
    }
}
