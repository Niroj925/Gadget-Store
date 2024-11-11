import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { deliveryEntity } from 'src/model/delivery.entity';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';
import { roleType } from 'src/helper/types/index.type';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(deliveryEntity)
    private readonly deliveryRepository:Repository<deliveryEntity>,

    private readonly dataSource:DataSource,

    private readonly hash:hash
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
}
