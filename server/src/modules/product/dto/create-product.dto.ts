import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  brand: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @ApiProperty()
  price: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  discount?: number;

  // @IsArray()
  // @ApiProperty()
  // specs:string[];
  @IsArray()
  @ApiProperty({
    description: 'List of product specifications',
    type: [String],
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  specs: string[];

  // @IsOptional()
  // @IsArray()
  // @ApiProperty()
  // colors?:string[];

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'List of product colors',
    type: [String],
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  colors?: string[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  @IsOptional()
  @IsArray()
  photo: Express.Multer.File[];
}

export class productImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  photo: Express.Multer.File;
}
