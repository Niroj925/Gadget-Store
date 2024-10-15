import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/helper/utils/token';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(authEntity)
    private readonly authRepository:Repository<authEntity>,

    private token:Token,
    private hash:hash
  ){}

  async create(createAuthDto: CreateAuthDto) {
    const {email,password}=createAuthDto;
   const authUser=await this.authRepository.findOne({
    where:{email},
    relations:['admin']
  });
  
   if (!authUser) {
    throw new ForbiddenException("User Not found")
  } else {
    const status = await this.hash.verifyHashing(authUser.password,password)
    if (!status) {
      throw new UnauthorizedException("Credential doesn't match")
    }
  
    const tokens = {
      acessToken: await this.token.generateAcessToken({ sub: authUser.admin.id, role: authUser.role }),
      refreshToken: await this.token.generateRefreshToken({ sub: authUser.admin.id, role: authUser.role }),
      role:authUser.role
    }
    authUser.rToken = await this.hash.value(tokens.refreshToken)
    await this.authRepository.save(authUser)
    return tokens
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
