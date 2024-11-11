import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    @ApiProperty()
    rating:number;

    @IsString()
    @ApiProperty()
    review:string;

    @IsString()
    @ApiProperty()
    productId:string;

    @IsString()
    @ApiProperty()
    customerId:string;
}
