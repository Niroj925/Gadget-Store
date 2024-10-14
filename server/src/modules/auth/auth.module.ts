import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Token } from 'src/helper/utils/token';
import { hash } from 'src/helper/utils/hash';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authEntity } from 'src/model/auth.entity';
import { AtStrategy } from 'src/middlewares/access_token/at.strategy';
import { RtStrategy } from 'src/middlewares/refresh_token/rt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([authEntity])],
  controllers: [AuthController],
  providers: [AuthService,Token,hash,AtStrategy,RtStrategy,JwtService],
})
export class AuthModule {}
