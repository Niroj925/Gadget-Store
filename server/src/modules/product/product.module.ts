import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productEntity } from 'src/model/product.entity';
import { productSpecEntity } from 'src/model/productSpec.entity';
import { productColorEntity } from 'src/model/productColor.entity';
import { UploadService } from 'src/helper/utils/files_upload';
import { productImageEntity } from 'src/model/productImage.entity';
import { newArrivalEntity } from 'src/model/newArrival.entity';
import { orderEntity } from 'src/model/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([productEntity,productSpecEntity,productImageEntity, productColorEntity,newArrivalEntity,orderEntity])],
  controllers: [ProductController],
  providers: [ProductService,UploadService],
  exports:[ProductService]
})
export class ProductModule {}
