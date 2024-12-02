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
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../../middlewares/google_strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/google-oauth.config';
import { customerEntity } from 'src/model/customer.entity';
import { UtStrategy } from 'src/middlewares/utils_token/ut.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([authEntity,customerEntity]),
    // PassportModule.register({ session: false }),
    ConfigModule.forFeature(googleOauthConfig)
  ],
  controllers: [AuthController],
  providers: [AuthService,Token,hash,AtStrategy,RtStrategy,JwtService,GoogleStrategy,UtStrategy],
})
export class AuthModule {}
