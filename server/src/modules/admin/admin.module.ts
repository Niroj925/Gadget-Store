import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminEntity } from 'src/model/admin.entity';
import { hash } from 'src/helper/utils/hash';

@Module({
  imports:[TypeOrmModule.forFeature([adminEntity])],
  controllers: [AdminController],
  providers: [AdminService,hash],
})
export class AdminModule {}
