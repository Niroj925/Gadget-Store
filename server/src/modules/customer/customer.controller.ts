import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, CreateLocationDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('customer')
@ApiTags('Customer')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('add-location/:customerId')
  create(@Param('customerId') customerId:string,@Body() createLocationDto: CreateLocationDto) {
    return this.customerService.create(customerId,createLocationDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch('location/:customerId')
  updateLocation(@Param('customerId') customerId: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.customerService.updateLocation(customerId, updateLocationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
