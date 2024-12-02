import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, MailDto, PasswordDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/helper/utils/token';
import { hash } from 'src/helper/utils/hash';
import { authEntity } from 'src/model/auth.entity';
import { customerEntity } from 'src/model/customer.entity';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { JwtPayload, roleType } from 'src/helper/types/index.type';
import { sendMail } from 'src/config/mail.config';

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

  async refreshTokenAdmin(user: JwtPayload) {
    return await this.token.generateAcessToken({ sub: user.sub, role: user.role })
  }

  async forgetPasswordAdmin(body: MailDto): Promise<boolean> {
    const existingUser = await this.authRepository.findOne({
      where: { email: body.email },
    });
    if (!existingUser) {
      throw new ForbiddenException("Email doesn't exist.");
    }
    const token = await this.token.generateUtilToken({
      sub: existingUser.id,
      role: existingUser.role,
    });
    const frontURL = `${process.env.ADMIN_URL}?token=${token}`;
    try {
      sendMail(body.email, 'Password Reset', this.passwordTemplate(frontURL));
    } catch (error) {
      throw error;
    }
    return true;
  }

  async resetPassword(id: string, passwordDto: PasswordDto) {
    const { newPassword } = passwordDto;
    const hash = await this.hash.value(newPassword);
    await this.authRepository.update({ id }, { password: hash });
    return true;
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

  passwordTemplate(resetUrl: any) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            width: 80%;
            padding: 12px;
            background-color: #007BFF;
            color: white;
            text-align: center;
            border-radius: 5px;
            font-size: 16px;
            text-decoration: none;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hello, User</p>
        <p>You've requested to reset your password for your e-commerce account. Click the link below to set a new password:</p>
        <a href="${resetUrl}" class="button" style="color: white; text-decoration: none;">Reset My Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p class="footer">© 2024 Hamro shop. All rights reserved.</p>
    </div>
</body>
</html>
  `;
  }
}
