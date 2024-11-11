import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { adminEntity } from 'src/model/admin.entity';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';
import { roleType } from 'src/helper/types/index.type';
import { CreateLocationDto } from '../customer/dto/create-customer.dto';
import { storeEntity } from 'src/model/store.entity';
import { UpdateLocationDto } from '../customer/dto/update-location.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(adminEntity)
    private readonly adminRepository: Repository<adminEntity>,

    @InjectRepository(authEntity)
    private readonly authRepository: Repository<authEntity>,

    @InjectRepository(storeEntity)
    private readonly storeRepository: Repository<storeEntity>,

    private readonly dataSource: DataSource,

    private readonly hash: hash,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password, location, name } = createAdminDto;
      const hashedPassword = await this.hash.value(password);
      const auth = new authEntity();
      auth.email = email;
      auth.password = hashedPassword;
      auth.role = roleType.admin;
      await queryRunner.manager.save(auth);

      const admin = new adminEntity();
      admin.name = name;
      admin.location = location;
      admin.auth = auth;
      await queryRunner.manager.save(admin);
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

 async addLocation(id:string,createLocationDto:CreateLocationDto){
  const {latitude,longitude,location}=createLocationDto;
  const store=this.storeRepository.create({
    location,
    latitude,
    longitude,
    admin:{id}
  });
  await this.storeRepository.save(store);
 }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email } = updateAdminDto;
      const admin = await this.adminRepository.findOne({
        where: { id },
        relations:['auth']
      });
      const updatedAdmin = Object.assign(admin, updateAdminDto);
      await queryRunner.manager.save(updatedAdmin);

       await this.authRepository.update({id:admin.auth.id},{email});
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

 async updateStore(id:string,updateLocationDto:UpdateLocationDto){
   const store=await this.storeRepository.findOne({where:{admin:{id}}});
   const updatedAdmin = Object.assign(store, updateLocationDto);
   await this.storeRepository.save(updatedAdmin);
   return true
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
