import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateDeliveryDto {
    @IsString()
    @ApiProperty()
    name:string;

    @IsNumber()
    @ApiProperty()
    phone:number;

    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    password:string;
}
