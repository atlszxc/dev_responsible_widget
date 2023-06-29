import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './manager.model';
import { ManagerController } from './manager.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manager]),
    UserModule,
  ],
  providers: [ManagerService],
  controllers: [ManagerController],
  exports: [ManagerService],
})

export class ManagerModule {}
