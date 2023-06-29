import { Module } from '@nestjs/common';
import { AlgoritmService } from './algoritm.service';

@Module({
  providers: [AlgoritmService],
  exports: [AlgoritmService]
})
export class AlgoritmModule {}
