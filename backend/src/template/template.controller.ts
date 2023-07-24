import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Template } from './template.model';
import { ROOT_ROUTES } from 'src/const/rootRoutes';
import { QueueAlgoritmService } from 'src/algoritm/queue-algorithm';
import { PercentAlgorithmService } from 'src/algoritm/percent-algorithm.service';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { CountAlgorithmService } from 'src/algoritm/count-algorithm.service';
import { QueueFactory } from './queueTemplate.factory';
import { HookDto } from './dto/hook.dto';

export enum AlgorithmType {
    QUEUE = 'По очереди',
    PERCENT = 'По процентам',
    COUNT = 'По количеству',
    ROUNDS = 'Перераспределение по времени'
}

@Controller(ROOT_ROUTES.TEMPLATE)
export class DistributionTemplateController {
    constructor(
        private readonly templateService: TemplateService,
        private readonly queueAlgoritmService: QueueAlgoritmService,
        private readonly percentAlgorithmService: PercentAlgorithmService,
        private readonly countAlgorithmService: CountAlgorithmService,
        private readonly queueFactory: QueueFactory
    ) {}

    @Get('/user/:userId')
    public async getTemplates(@Param('userId') userId: string): Promise<Template[]> {
        try {
            return await this.templateService.getTemplates(userId)
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/hook')
    public async hook(@Body() data: HookDto) {
        try {
            const template = await this.templateService.getTemplate(data.action.settings.widget.settings.templates)
            const userQueue = this.queueFactory.findQueue(template.userId)

            if(template.algorithm === AlgorithmType.QUEUE) {
                userQueue.add({
                    service: this.queueAlgoritmService,
                    args: [data.action.settings.widget.settings.templates, data.event.data.id, data.action.settings.widget.settings.triggerId]
                })
            }
            if(template.algorithm === AlgorithmType.PERCENT) {
                userQueue.add({
                    service: this.percentAlgorithmService,
                    args: [data.action.settings.widget.settings.templates, data.event.data.id, data.action.settings.widget.settings.triggerId]
                })
            }
            if(template.algorithm === AlgorithmType.COUNT) {
                userQueue.add({
                    service: this.countAlgorithmService,
                    args: [data.action.settings.widget.settings.templates, data.event.data.id, data.action.settings.widget.settings.triggerId]
                })
            }
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    @Post('/:userId')
    public async createTemplate(@Param('userId') userId: string, @Body() data: CreateTemplateDto): Promise<void> {
        try {
            await this.templateService.createTemplate(userId, data)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put('/update/:id')
    public async updateTemplate(@Param('id') id: string, @Body() data: CreateTemplateDto) {
        try {
            await this.templateService.updateTemplate(id, data)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //Для дев версии виджета, не трогать, не ругать, не бить

    // @Get('/set/:templateId/deal/:dealId')
    // public async setTemplate(@Param('templateId') templateId: string, @Param('dealId') dealId: string): Promise<void> {
    //     try {
    //         const template = await this.templateService.getTemplate(templateId)
    //         const user = await this.userService.getUser(template.userId)
    //         const deal = await this.amoApiService.getDeal(user.subdomain, user.access_token, user.refresh_token, dealId)
    //         if(template.algorithm === AlgorithmType.QUEUE) {
    //             await this.queueAlgoritmService.setAlgorithm(template, deal)
    //         }
    //         if(template.algorithm === AlgorithmType.PERCENT) {
    //             await this.percentAlgorithmService.setTemplate(template, deal)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    @Delete('/:id')
    public async deleteTemplate(@Param('id') id: string): Promise<void> {
        try {
            await this.templateService.deleteTemplate(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
