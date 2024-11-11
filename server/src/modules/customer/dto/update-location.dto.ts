import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-customer.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
