import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
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
    deliveryCharge:number

    @ApiProperty({
        type: [orderProductDto], 
    })
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => orderProductDto)
    orderInfo: orderProductDto[];
}


