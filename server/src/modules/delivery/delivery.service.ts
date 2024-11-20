import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { deliveryEntity } from 'src/model/delivery.entity';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';
import { orderStatus, roleType } from 'src/helper/types/index.type';
import { OrderService } from '../order/order.service';
import { storeEntity } from 'src/model/store.entity';
import { PaginationDto } from 'src/helper/utils/pagination.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(deliveryEntity)
    private readonly deliveryRepository:Repository<deliveryEntity>,

    @InjectRepository(storeEntity)
    private readonly storeRepository:Repository<storeEntity>,

    private readonly dataSource:DataSource,

    private readonly hash:hash,

    private readonly orderService:OrderService
  ){}
 async create(createDeliveryDto: CreateDeliveryDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password, phone, name } = createDeliveryDto;
      const hashedPassword = await this.hash.value(password);
      const auth = new authEntity();
      auth.email = email;
      auth.password = hashedPassword;
      auth.role = roleType.delivery;
      await queryRunner.manager.save(auth);

      const delivery = new deliveryEntity();
      delivery.name = name;
      delivery.phone = phone;
      delivery.auth = auth;
      await queryRunner.manager.save(delivery);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException(error.errorResponse);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.deliveryRepository.find();
  }

  async myDelivery( paginationDto: PaginationDto,){
   const orders=await this.orderService.findByStatus(orderStatus.shipped,paginationDto);
   const store=await this.storeRepository.find();

   orders.forEach((order: any) => {
    let {latitude,longitude}=order.customer.location;
    let distance = this.haversine(store[0].latitude, store[0].longitude, latitude,longitude);
    (order as any).distance = distance;
  });
  orders.sort((a: any, b: any) => a.distance - b.distance);
   return orders
  }

 async findOne(id: string) {
    return await this.deliveryRepository.findOne({where:{id}});
  }

 async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
  const delivery=await this.deliveryRepository.findOne({where:{id}});
  const updatedCustomer = Object.assign(delivery, updateDeliveryDto);
  await this.deliveryRepository.save(updatedCustomer);
    return true;
  }

 async remove(id: string) {
  await this.deliveryRepository.delete({id});
    return true;
  }

  haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Radius of the Earth in kilometers
    const R: number = 6371.0;

    // Convert latitude and longitude from degrees to radians
    const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const lat1Rad: number = toRadians(lat1);
    const lon1Rad: number = toRadians(lon1);
    const lat2Rad: number = toRadians(lat2);
    const lon2Rad: number = toRadians(lon2);

    // Differences in latitude and longitude
    const dLat: number = lat2Rad - lat1Rad;
    const dLon: number = lon2Rad - lon1Rad;

    // Haversine formula
    const a: number = Math.sin(dLat / 2) ** 2 +
                      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                      Math.sin(dLon / 2) ** 2;

    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance: number = R * c;

    return distance;
}
}
