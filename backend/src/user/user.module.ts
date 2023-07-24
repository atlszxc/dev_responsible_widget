import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { TemplateModule } from 'src/template/template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => TemplateModule)
  ],
  providers: [UserService],
  exports: [
    UserService
  ]
})
export class UserModule {}
