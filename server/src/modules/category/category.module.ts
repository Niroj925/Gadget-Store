import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoryEntity } from 'src/model/category.entity';
import { UploadService } from 'src/helper/utils/files_upload';

@Module({
  imports:[TypeOrmModule.forFeature([categoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService,UploadService],
})
export class CategoryModule {}
