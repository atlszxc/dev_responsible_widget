import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TemplateService } from './template.service';
import { UserService } from 'src/user/user.service';
import { ITemplate } from './template.types';

@Controller('template')
export class TemplateController {
    constructor(
        private readonly templateService: TemplateService,
        private readonly userService: UserService
    ) {}

    @Get('/user/:userId')
    getTemplates(@Param('userId') userId: string) {
        return this.templateService.getTemplates(userId)
    }

    @Get('/:id')
    getTemplate(@Param('id') id: string) {
        return this.templateService.getTemplate(id)
    }

    @Post('/:userId')
    async createTemplate(@Param('userId') userId: string, @Body() data: ITemplate) {
        const user = await this.userService.getUser(userId)
        this.templateService.createTemplate({...data, user})
    }

    @Get('/dp/:id')
    async setSelectedTemplate(@Param('id') id: string) {
        console.log(id)
        await this.templateService.setTemplate(id)
    }

    @Delete('/:id')
    deleteTemplate(@Param('id') id: string) {
        return this.templateService.deleteTemplate(id)
    }
}
