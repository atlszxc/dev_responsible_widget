import { Module, forwardRef } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';
import { AmoApiModule } from 'src/amo-api/amo-api.module';
import { ManagerModule } from 'src/manager/manager.module';
import { QueueAlgoritmService } from './queue-algorithm';
import { TemplateModule } from 'src/template/template.module';
import { PercentAlgorithmService } from './percent-algorithm.service';
import { UserModule } from 'src/user/user.module';
import { CountAlgorithmService } from './count-algorithm.service';
import { RoundsAlgorithm } from './rounds-algrithm';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from 'src/template/template.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Template.name, schema: TemplateSchema }]),
    AmoApiModule,
    ManagerModule, 
    forwardRef(() => TemplateModule),
    forwardRef(() => UserModule),
  ],
  providers: [AlgorithmService, QueueAlgoritmService, PercentAlgorithmService, CountAlgorithmService, RoundsAlgorithm],
  exports: [AlgorithmService, QueueAlgoritmService, PercentAlgorithmService, CountAlgorithmService, RoundsAlgorithm]
})
export class AlgoritmModule {}
