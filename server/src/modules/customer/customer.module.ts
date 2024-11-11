import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { locationEntity } from 'src/model/location.entity';
import { customerEntity } from 'src/model/customer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([locationEntity,customerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
