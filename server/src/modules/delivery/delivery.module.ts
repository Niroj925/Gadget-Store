import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { deliveryEntity } from 'src/model/delivery.entity';
import { authEntity } from 'src/model/auth.entity';
import { hash } from 'src/helper/utils/hash';
import { OrderService } from '../order/order.service';
import { orderEntity } from 'src/model/order.entity';
import { storeEntity } from 'src/model/store.entity';

@Module({
  imports:[TypeOrmModule.forFeature([deliveryEntity,authEntity,orderEntity,storeEntity])],
  controllers: [DeliveryController],
  providers: [DeliveryService,hash,OrderService],
})
export class DeliveryModule {}
