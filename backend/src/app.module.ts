import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TemplateModule } from './template/template.module';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';
import { AlgoritmModule } from './algoritm/algorithm.module';
import { AmoApiModule } from './amo-api/amo-api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_NAME, DB_URI } from './const/config';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: 'logs/info.log',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(info => `[${info.timestamp}]\t ${info.level}\t message: ${info.message}`),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(info => `[${info.timestamp}]\t ${info.level}\t message: ${info.message}`),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/debug.log',
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(info => `[${info.timestamp}]\t ${info.level}\t message: ${info.message}`),
          ),
        })
      ]
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(DB_URI, {
      dbName: DB_NAME,
    }),
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
