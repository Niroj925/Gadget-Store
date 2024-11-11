import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @ApiProperty()
    name:string;

    @IsString()
    @ApiProperty()
    email:string

    @IsString()
    @ApiProperty()
    profile:string;

   @IsOptional()
   @ApiProperty()
   @IsNumber()
   phone:number;
}

export class CreateLocationDto{
    @ApiProperty()
    @IsNumber()
    latitude:number;

    @ApiProperty()
    @IsNumber()
    longitude:number;

    @ApiProperty()
    @IsString()
    location:string;
}
