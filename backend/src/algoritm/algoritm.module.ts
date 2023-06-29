import { Module } from '@nestjs/common';
import { AlgoritmService } from './algoritm.service';
import { AmoApiModule } from 'src/amo-api/amo-api.module';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports: [AmoApiModule, ManagerModule],
  providers: [AlgoritmService],
  exports: [AlgoritmService]
})
export class AlgoritmModule {}
