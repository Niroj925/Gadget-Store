import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, CreateLocationDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { locationEntity } from 'src/model/location.entity';
import { Repository } from 'typeorm';
import { customerEntity } from 'src/model/customer.entity';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(locationEntity)
    private readonly locationRepository:Repository<locationEntity>,

    @InjectRepository(customerEntity)
    private readonly customerRepository:Repository<customerEntity>
  ){}

  async create(id:string,createLocationDto: CreateLocationDto) {
    const {latitude,longitude,location}=createLocationDto;
    const customerLocation=this.locationRepository.create({
      latitude,
      longitude,
      location,
      customer:{id}
    });
    await this.locationRepository.save(customerLocation);
    return true;
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: string) {
    return await this.customerRepository.findOne({where:{id}});
  }

  async updateLocation(id:string,updateLocationDto:UpdateLocationDto){
    const location = await this.locationRepository.findOne({ where: { customer:{ id} } });
    const updatedLocation = Object.assign(location, updateLocationDto);
     await this.locationRepository.save(updatedLocation);
     return true
  }

 async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const location = await this.customerRepository.findOne({ where: { id}});
    const updatedCustomer = Object.assign(location, updateCustomerDto);
     await this.customerRepository.save(updatedCustomer);
     return true
  }

 async remove(id: string) {
   await this.customerRepository.delete({id});
    return true;
  }
}
