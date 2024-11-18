import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderEntity } from 'src/model/order.entity';
import { paymentEntity } from 'src/model/payment.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([orderEntity,paymentEntity]),
    ProductModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
