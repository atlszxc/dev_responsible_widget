import { Module } from '@nestjs/common';
import { TaskschedulesService } from './taskschedules.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TaskschedulesService],
  exports: [TaskschedulesService]
})
export class TaskschedulesModule {}
