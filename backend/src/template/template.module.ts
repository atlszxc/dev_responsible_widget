import { Module, forwardRef } from '@nestjs/common';
import { TemplateService } from './template.service';
import { DistributionTemplateController } from './template.controller';
import { ManagerModule } from 'src/manager/manager.module';
import { AlgoritmModule } from 'src/algoritm/algorithm.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from './template.model';
import { AmoApiModule } from 'src/amo-api/amo-api.module';
import { QueueFactory } from './queueTemplate.factory';
import { UserModule } from 'src/user/user.module';
import { Trigger, TriggerSchema } from './trigger.model';
import { managerTrigger, ManagerTriggerSchema } from './managerTrigger';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Template.name, schema: TemplateSchema },
        { name: Trigger.name, schema: TriggerSchema },
        { name: managerTrigger.name, schema: ManagerTriggerSchema }
      ]
    ),
    ManagerModule,
    AlgoritmModule,
    AmoApiModule,
    forwardRef(() => UserModule)
  ],
  providers: [
    TemplateService, 
    QueueFactory, 
  ],
  controllers: [DistributionTemplateController],
  exports: [
    TemplateService,
    QueueFactory,
  ]
})
export class TemplateModule {}
