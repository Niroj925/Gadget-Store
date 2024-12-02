import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    @ApiProperty()
    email:string

    @IsString()
    @ApiProperty()
    password:string
}

export class MailDto{
    @IsEmail()
    @ApiProperty()
    email:string
}

export class PasswordDto{
    @IsString()
    @ApiProperty()
    newPassword:string
}
