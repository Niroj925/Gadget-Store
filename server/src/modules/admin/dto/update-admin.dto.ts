
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto  {
    @IsOptional()
    @IsString()
    @ApiProperty()
    name?:string;

    @IsOptional()
    @IsEmail()
    @ApiProperty()
    email?:string;

    @IsOptional()
    @ApiProperty()
    @IsString()
    location?:string;
}
