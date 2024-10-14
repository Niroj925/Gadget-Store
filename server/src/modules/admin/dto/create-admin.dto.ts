import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @ApiProperty()
    name:string;

    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    password:string;

    @IsOptional()
    @ApiProperty()
    @IsString()
    location:string;

}
