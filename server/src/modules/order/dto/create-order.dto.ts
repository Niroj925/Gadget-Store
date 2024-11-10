import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class orderProductDto{
    @ApiProperty()
    @IsString()
    product:string;

    @ApiProperty()
    @IsNumber()
    quantity:number;
}

export class CreateOrderDto {
    @ApiProperty({
        type: [orderProductDto], 
    })
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => orderProductDto)
    orderInfo: orderProductDto[];
}


