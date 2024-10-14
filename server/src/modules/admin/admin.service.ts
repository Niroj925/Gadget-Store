import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { adminEntity } from 'src/model/admin.entity';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';
import { roleType } from 'src/helper/types/index.type';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(adminEntity)
    private readonly adminRepository:Repository<adminEntity>,

    private readonly dataSource:DataSource,

    private readonly hash:hash
  ){}
  async create(createAdminDto: CreateAdminDto) {
    console.log(createAdminDto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password } = createAdminDto;
      const hashedPassword = await this.hash.value(password);
      const auth = new authEntity();
      auth.email = email;
      (auth.password = hashedPassword), (auth.role = roleType.admin);
      await queryRunner.manager.save(auth);

      const admin = new adminEntity();
       admin.name="",
       admin.auth=auth
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

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

 async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });
    const updatedAdmin = Object.assign(admin, updateAdminDto);
    this.adminRepository.save(updatedAdmin);
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
