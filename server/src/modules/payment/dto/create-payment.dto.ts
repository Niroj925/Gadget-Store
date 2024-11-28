import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    
    @IsString()
    @ApiProperty()
    orderId:string;

    @IsNumber()
    @ApiProperty()
    totalAmount:number;
}
