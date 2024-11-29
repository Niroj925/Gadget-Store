import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { paymentMethod } from 'src/helper/types/index.type';

@Controller('payment')
@ApiTags('Payment')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initialize-esewa')
  @ApiOperation({ summary: 'payment initialization' })
  @ApiQuery({ name: 'paymentMethod', enum: paymentMethod })
  create(
    @Query('paymentMethod') paymentMethod: paymentMethod,
    @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(paymentMethod,createPaymentDto);
  }

  @Get('complete-payment')
  verifyPayment(@Query() query:{data:any}) {
    return this.paymentService.verifyPayment(query.data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
