import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createBulkProductDto, CreateProductDto, productImageDto, searchProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/middlewares/authorisation/roles.decorator';
import { filterProductType, ProductStatus, roleType } from 'src/helper/types/index.type';
import { AtGuard } from 'src/middlewares/access_token/at.guard';
import { RolesGuard } from 'src/middlewares/authorisation/roles.guard';
import { PaginationDto } from 'src/helper/utils/pagination.dto';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { UploadService } from 'src/helper/utils/files_upload';

@Controller('product')
@ApiTags('Product')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('add/:categoryId')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'add product' })
  @UseInterceptors(FilesInterceptor('photo'))
  async create(
    @Param('categoryId') categoryId: string,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const fileUrls = [];
    for (const file of files) {
      // const fileUrl = await this.uploadService.upload(
      //   file.originalname,
      //   file.buffer,
      // );
      const fileUrl =createProductDto.photo?createProductDto.photo: await this.uploadService.upload(file);
      fileUrls.push(fileUrl);
    }
    return this.productService.create(categoryId, createProductDto, fileUrls);
  }

  @Post('upload-image/:productId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadFile(
    @Param('productId') productId: string,
    @Body() productImageDto: productImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // const s3response = await this.uploadService.upload(
    //   file.originalname,
    //   file.buffer,
    // );
    const s3response =await this.uploadService.upload(file);
   
    return this.productService.uploadImage(productId, s3response);
  }

  @Post('new-arrival/:productId')
  addNewArrival(@Param('productId') productId: string) {
    return this.productService.addNewArrival(productId);
  }

  @Get()
  findAll(@Query() paginationDto?: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get('search')
  findAllProducts( @Query() searchDto?: searchProductDto) {
    return this.productService.findAllProducts(searchDto);
  }


  @Get('filter')
  @ApiQuery({name:'filterType',enum:filterProductType})
  findProduct(
    @Query()  searchDto?: searchProductDto,
    @Query() query?:{filterType:filterProductType},
  ) {
    return this.productService.findProduct(query.filterType, searchDto);
  }

  @Get('new-arrival')
  findArrival(){
    return this.productService.findArrival();
  }

  @Get('new')
  findNewArrival(){
    return this.productService.findNewArrival();
  }

  @Get('popular')
  findPopular(){
    return this.productService.findPopular();
  }


  @Get('find-price/:id')
  findPrice(@Param('id') id: string){
    return this.productService.findPrice(id);
  }

  @Get('similar-product/:id')
  findSimilarProduct(@Param('id',ParseUUIDPipe) id: string) {
    return this.productService.findSimilarProduct(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('change-status')
  // @Roles(roleType.admin)
  // @UseGuards(AtGuard, RolesGuard)
  // @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update product status' })
  @ApiQuery({name:'status',enum:ProductStatus})
  changeBulkStatus(@Query() query: { status: ProductStatus },@Body() createBulkProductDto:createBulkProductDto) {
    return this.productService.changeBulkStatus(createBulkProductDto,query.status);
  }

  @Patch('bulk-delete')
  // @Roles(roleType.admin)
  // @UseGuards(AtGuard, RolesGuard)
  // @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'delete product' })
  deleteBulk(@Body() createBulkProductDto:createBulkProductDto) {
    return this.productService.deleteBulk(createBulkProductDto);
  }


  @Patch(':id')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('photo'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update product' })
 async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,
  @UploadedFiles() files: Array<Express.Multer.File>,
) {
  const fileUrls = [];
  for (const file of files) {
    // const fileUrl = await this.uploadService.upload(
    //   file.originalname,
    //   file.buffer,
    // );
    const fileUrl = await this.uploadService.upload(file);
    fileUrls.push(fileUrl);
  }
  // return updateProductDto;
  return this.productService.update(id,fileUrls, updateProductDto);
  }

  @Delete('product-image/:imageId')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  async removeProductImage(@Param('imageId') imageId: string) {
    return this.productService.removeProductImage(imageId);
  }

  @Delete('new-arrival/:id')
  async removeNewArrival(@Param('id') id: string) {
    return this.productService.removeNewArrival(id);
  }

  @Delete('color/:id')
  async removeProductColor(@Param('id') id: string) {
    return this.productService.removeProductColor(id);
  }

  @Delete('image/:id')
  async removeImage(@Param('id') id: string) {
    return this.productService.removeImage(id);
  }


  @Delete(':id')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'delete product' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
