import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ManagerModule } from 'src/manager/manager.module';
import { AmoApiModule } from 'src/amo-api/amo-api.module';

@Module({
  imports: [
    UserModule, 
    ManagerModule,
    AmoApiModule,
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
