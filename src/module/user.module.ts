import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from './auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    SharedModule,
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
