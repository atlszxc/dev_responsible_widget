import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './template.model';
import { TemplateController } from './template.controller';
import { UserModule } from 'src/user/user.module';
import { ManagerModule } from 'src/manager/manager.module';
import { AlgoritmModule } from 'src/algoritm/algoritm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template]), 
    UserModule,
    ManagerModule,
    AlgoritmModule,
  ],
  providers: [TemplateService],
  controllers: [TemplateController]
})
export class TemplateModule {}
