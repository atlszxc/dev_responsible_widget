import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from './manager.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
  ],
  providers: [ManagerService],
  controllers: [ManagerController],
  exports: [ManagerService],
})

export class ManagerModule {}
