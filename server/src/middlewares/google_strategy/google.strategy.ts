import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import googleOauthConfig from 'src/config/google-oauth.config';
import { AuthService } from 'src/modules/auth/auth.service';
import { CreateCustomerDto } from 'src/modules/customer/dto/create-customer.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY) 
    private googleConfiguration:ConfigType<typeof googleOauthConfig>,
    private authService:AuthService
  ) {
    super({
      clientID: googleConfiguration.clientID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user:CreateCustomerDto = {
      email: emails[0].value,
      name:name.givenName+' '+name.familyName,
      profile: photos[0].value,
      phone:null
    };
   const customer=await this.authService.validateGoogleUser(user);
    done(null, customer);
  }
}