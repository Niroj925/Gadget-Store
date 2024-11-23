import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateRemarkDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  orderStatus,
  paymentMethod,
  paymentStatus,
} from 'src/helper/types/index.type';
import { PaginationDto } from 'src/helper/utils/pagination.dto';

@Controller('order')
@ApiTags('Order')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':customerId')
  @ApiOperation({ summary: 'create order' })
  @ApiQuery({ name: 'paymentMethod', enum: paymentMethod })
  create(
    @Query('paymentMethod') paymentMethod: paymentMethod,
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.create(customerId, paymentMethod, createOrderDto);
  }

  @Get('customer/:customerId')
  findAll(@Param('customerId', ParseUUIDPipe) customerId: string) {
    return this.orderService.findAll(customerId);
  }

  @Get('status')
  @ApiQuery({ name: 'status', enum: orderStatus })
  findByStatus(@Query() query: { status: orderStatus }, @Query() paginationDto?: PaginationDto,) {
    return this.orderService.findByStatus(query.status,paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('payment-status/:paymentId')
  @ApiQuery({ name: 'status', enum: paymentStatus })
  updatePaymentStatus(
    @Param('paymentId', ParseUUIDPipe) paymentId: string,
    @Query() query: { status: paymentStatus },
    @Body() body:CreateRemarkDto
  ) {
    return this.orderService.updatePaymentStatus(paymentId, query.status,body);
  }

  @Patch('status/:orderId')
  @ApiQuery({ name: 'status', enum: orderStatus })
  @ApiQuery({ name: 'remarks', required:false})
  updateStatus(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Query() query: { remarks:string,status: orderStatus },
  ) {
    return this.orderService.updateOrderStatus(orderId, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
