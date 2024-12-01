import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { paymentMethod } from "src/helper/types/index.type";

export class orderProductDto{
    @ApiProperty()
    @IsString()
    product:string;

    @ApiProperty()
    @IsNumber()
    quantity:number;
}

export class CreateOrderDto {

    @ApiProperty()
    @IsNumber()
    deliveryCharge:number;

    @IsOptional()
    @ApiProperty()
    @IsNumber()
    customerContact?:number;

    @ApiProperty({ example: 40.7128 })
    @IsNumber()
    latitude: number;
  
    @ApiProperty({ example: -74.0060 })
    @IsNumber()
    longitude: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    location?:string;

    @ApiProperty({
        type: [orderProductDto], 
    })
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => orderProductDto)
    orderInfo: orderProductDto[];
}

export class CreateRemarkDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    remarks?:string;
}




