import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    name:string;

    @IsString()
    email:string

    @IsString()
    profile:string;

   @IsOptional()
   @IsNumber()
   phone:number;

}
