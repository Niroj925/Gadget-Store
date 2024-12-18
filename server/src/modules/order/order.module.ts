import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderEntity } from 'src/model/order.entity';
import { paymentEntity } from 'src/model/payment.entity';
import { ProductModule } from '../product/product.module';
import { productEntity } from 'src/model/product.entity';
import { PaymentService } from '../payment/payment.service';
import { customerEntity } from 'src/model/customer.entity';
import { locationEntity } from 'src/model/location.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([orderEntity,paymentEntity,productEntity,customerEntity,locationEntity]),
    ProductModule
  ],
  controllers: [OrderController],
  providers: [OrderService,PaymentService],
  exports:[OrderService,PaymentService]
})
export class OrderModule {}
