import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminEntity } from 'src/model/admin.entity';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([adminEntity,authEntity])],
  controllers: [AdminController],
  providers: [AdminService,hash],
})
export class AdminModule {}