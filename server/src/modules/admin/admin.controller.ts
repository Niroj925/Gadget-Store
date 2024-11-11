import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/middlewares/authorisation/roles.decorator';
import { roleType } from 'src/helper/types/index.type';
import { AtGuard } from 'src/middlewares/access_token/at.guard';
import { RolesGuard } from 'src/middlewares/authorisation/roles.guard';
import { CreateLocationDto } from '../customer/dto/create-customer.dto';
import { UpdateLocationDto } from '../customer/dto/update-location.dto';

@Controller('admin')
@ApiTags('Admin')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  // @Roles(roleType.user)
  // @UseGuards(AtGuard, RolesGuard)
  // @ApiBearerAuth('access-token')
  // @ApiQuery({ name: 'courtId' })
  // @ApiQuery({ name: 'priceId' })
  @ApiOperation({ summary: 'create admin' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('add-location')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'add store location' })
  addLocation(@Req() req: any, @Body() createLocationDto: CreateLocationDto) {
    const adminId = req.user.sub;
    return this.adminService.addLocation(adminId, createLocationDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch('update-location')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update store location' })
  updateStore(@Req() req: any, @Body() createLocationDto: UpdateLocationDto) {
    const adminId = req.user.sub;
    return this.adminService.updateStore(adminId, createLocationDto);
  }

  @Patch()
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  update(@Req() req: any, @Body() updateAdminDto: UpdateAdminDto) {
    const adminId = req.user.sub;
    return this.adminService.update(adminId, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
