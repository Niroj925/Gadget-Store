import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { deliveryEntity } from 'src/model/delivery.entity';
import { hash } from 'src/helper/utils/hash';
import { storeEntity } from 'src/model/store.entity';
import { OrderModule } from '../order/order.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([deliveryEntity,storeEntity]),
    OrderModule
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService,hash],
})
export class DeliveryModule {}
