import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
    @Transform(({ value }) => parseInt(value))
    @ApiProperty()
    @IsInt()
    @Min(1)
    page: number;


    @Transform(({ value }) => parseInt(value))
    @ApiProperty()
    @IsInt()
    @Min(1)
    pageSize: number;
}