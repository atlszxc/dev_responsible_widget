import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TemplateModule } from './template/template.module';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskschedulesModule } from './taskschedules/taskschedules.module';
import { AlgoritmModule } from './algoritm/algoritm.module';
import { AmoApiModule } from './amo-api/amo-api.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'responsible_widget_db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    TaskschedulesModule,
    UserModule,
    TemplateModule,
    ManagerModule,
    AuthModule,
    AlgoritmModule,
    AmoApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
