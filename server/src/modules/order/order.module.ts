import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderEntity } from 'src/model/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([orderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
