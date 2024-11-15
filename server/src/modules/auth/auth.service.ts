import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/helper/utils/token';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';
import { customerEntity } from 'src/model/customer.entity';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { roleType } from 'src/helper/types/index.type';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(authEntity)
    private readonly authRepository:Repository<authEntity>,

    @InjectRepository(customerEntity)
    private readonly customerRepository:Repository<customerEntity>,

    private token:Token,
    private hash:hash
  ){}

  async create(createAuthDto: CreateAuthDto) {
    const {email,password}=createAuthDto;
   const authUser=await this.authRepository.findOne({
    where:{email},
    relations:['admin','delivery']
  });
  
   if (!authUser) {
    throw new ForbiddenException("User Not found")
  } else {
    const status = await this.hash.verifyHashing(authUser.password,password)
    if (!status) {
      throw new UnauthorizedException("Credential doesn't match")
    }
  
    const tokens = {
      accessToken: await this.token.generateAcessToken({ sub: authUser.role==roleType.admin? authUser.admin.id:authUser.delivery.id, role: authUser.role }),
      refreshToken: await this.token.generateRefreshToken({ sub: authUser.role==roleType.admin? authUser.admin.id:authUser.delivery.id, role: authUser.role }),
      role:authUser.role
    }
    authUser.rToken = await this.hash.value(tokens.refreshToken)
    await this.authRepository.save(authUser)
    return tokens
  }
  }

  async validateGoogleUser(createCustomerDto:CreateCustomerDto){

    const customer=await this.customerRepository.findOne({where:{email:createCustomerDto.email}});
    if(customer){
      console.log('customer exist');
      return customer;
    }else{
      console.log('customer does not exist');
      const newCustomer=this.customerRepository.create({
        email:createCustomerDto.email,
        profile:createCustomerDto.profile,
        name:createCustomerDto.name
      });
      await this.customerRepository.save(newCustomer);
      return newCustomer;
    }

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
