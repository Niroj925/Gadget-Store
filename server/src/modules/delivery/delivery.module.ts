import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { deliveryEntity } from 'src/model/delivery.entity';
import { authEntity } from 'src/model/auth.entity';
import { hash } from 'src/helper/utils/hash';

@Module({
  imports:[TypeOrmModule.forFeature([deliveryEntity,authEntity])],
  controllers: [DeliveryController],
  providers: [DeliveryService,hash],
})
export class DeliveryModule {}
