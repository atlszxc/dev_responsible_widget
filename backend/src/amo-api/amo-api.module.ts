import { Module, forwardRef } from '@nestjs/common';
import { AmoApiService } from './amo-api.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule)
  ],
  providers: [AmoApiService],
  exports: [AmoApiService]
})
export class AmoApiModule {}
