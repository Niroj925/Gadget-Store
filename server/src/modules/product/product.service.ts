import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  createBulkProductDto,
  CreateProductDto,
  searchProductDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { productEntity } from 'src/model/product.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { productSpecEntity } from 'src/model/productSpec.entity';
import { productImageEntity } from 'src/model/productImage.entity';
import { categoryEntity } from 'src/model/category.entity';
import { PaginationDto } from 'src/helper/utils/pagination.dto';
import { productColorEntity } from 'src/model/productColor.entity';
import { newArrivalEntity } from 'src/model/newArrival.entity';
import {
  filterProductType,
  orderStatus,
  ProductStatus,
} from 'src/helper/types/index.type';
import { paginationToken } from 'aws-sdk/clients/supportapp';
import { retry } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(productEntity)
    private readonly productRepository: Repository<productEntity>,

    @InjectRepository(productSpecEntity)
    private readonly productSpecRepository: Repository<productSpecEntity>,

    @InjectRepository(productImageEntity)
    private readonly productImageRepository: Repository<productImageEntity>,

    @InjectRepository(productColorEntity)
    private readonly productColorRepository: Repository<productColorEntity>,

    @InjectRepository(newArrivalEntity)
    private readonly newArrivalRepository: Repository<newArrivalEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    categoryId: string,
    createProductDto: CreateProductDto,
    fileUrls: any,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { name, price, discount, description, brand, specs, colors } =
        createProductDto;
      const product = new productEntity();
      product.name = name;
      product.price = price;
      product.brand = brand;
      product.discount = discount ? discount : 0;
      product.description = description;
      product.category = { id: categoryId } as categoryEntity;
      await queryRunner.manager.save(product);

      const productSpecs = specs.map((spec) => {
        const productSpec = new productSpecEntity();
        productSpec.specification = spec;
        productSpec.product = product;
        return productSpec;
      });

      await queryRunner.manager.save(productSpecs);

      const productImages = fileUrls.map((file: any) => {
        const productSpec = new productImageEntity();
        productSpec.image = file;
        productSpec.product = product;
        return productSpec;
      });

      await queryRunner.manager.save(productImages);

      const productColors =
        colors &&
        colors.map((color) => {
          const productSpec = new productColorEntity();
          productSpec.color = color;
          productSpec.product = product;
          return productSpec;
        });

      await queryRunner.manager.save(productColors);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException(error.errorResponse);
    } finally {
      await queryRunner.release();
    }
  }

  async uploadImage(id: string, image: string) {
    const productImage = new productImageEntity();
    productImage.image = image;
    productImage.product = { id } as productEntity;

    await this.productImageRepository.save(productImage);
    return true;
  }

  async addNewArrival(id: string) {
    const newArrival = this.newArrivalRepository.create({
      product: { id },
    });
    await this.newArrivalRepository.save(newArrival);
    return true;
  }

  async findAll(pagination: PaginationDto) {
    const { page, pageSize } = pagination;
    const products = await this.productRepository.find({
      // relations:['spec','color','image'],
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['category'],
      select: {
        id: true,
        name: true,
        price: true,
        status: true,
        category: {
          id: true,
          name: true,
        },
      },
    });
    return products;
  }

  async findPrice(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      select: {
        id: true,
        price: true,
        discount: true,
      },
    });
    return product;
  }

  async findAllProducts(searchDto: searchProductDto) {
    const {search, page, pageSize } = searchDto;
    const [products,productCount] = await this.productRepository.findAndCount({
      where: {
        status: ProductStatus.available,
        name: ILike(`%${search??''}%`),

      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['review', 'image'],
      select: {
        id: true,
        name: true,
        review: {
          id: true,
          rating: true,
        },
        image: {
          id: true,
          image: true,
        },
      },
    });
    // return products
    const fp = products.map((product) => {
      const totalRatings = product.review.reduce((sum, review) => sum + (review.rating || 0), 0);
      const averageRating = product.review.length > 0 ? totalRatings / product.review.length : null;
    
      return {
        id: product.id,
        name: product.name,
        image: product.image?.[0]?.image || null,
        averageRating: averageRating ? averageRating.toFixed(2) : null, 
      };
    });
    return { products: fp, productCount };
    
  }

  async findArrival() {
    const newArrivals = await this.newArrivalRepository.find({
      relations: ['product.image', 'product.spec'],
      select: {
        id: true,
        product: {
          id: true,
          name: true,
          price: true,
          description: true,
          spec: true,
          image: {
            id: true,
            image: true,
          },
        },
      },
    });
    return newArrivals;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['spec', 'image', 'color', 'review', 'category'],
    });
    return product;
  }

  async findProduct(query: filterProductType, paginationDto: PaginationDto) {
    const product = await this.productRepository.find({
      relations: ['review', 'order.orderProduct'],
      select: {
        id: true,
        name: true,
        price: true,
        review: {
          id: true,
          rating: true,
          review: true,
        },
        order: {
          id: true,
        },
      },
    });

    return product;
  }

  async update(id: string, fileUrls: any, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    const updatedProduct = Object.assign(product, updateProductDto);
    if (updateProductDto.colors) {
      const colors = updateProductDto.colors.map((color) => {
        const newColor = this.productColorRepository.create({
          color: color,
          product: { id },
        });
        return newColor;
      });
      await this.productColorRepository.save(colors);
    }

    if (fileUrls.length > 0) {
      const images = fileUrls.map((file) => {
        const newColor = this.productImageRepository.create({
          image: file,
          product: { id },
        });
        return newColor;
      });
      await this.productImageRepository.save(images);
    }
    await this.productRepository.save(updatedProduct);
    return true;
  }

  async changeBulkStatus(
    createBulkProductDto: createBulkProductDto,
    status: ProductStatus,
  ) {
    const { productIds } = createBulkProductDto;
    productIds.forEach(async (productId) => {
      await this.productRepository.update({ id: productId }, { status });
    });
    return true;
  }

  async remove(id: string) {
    await this.productRepository.delete({ id });
    return true;
  }

  async removeImage(id: string) {
    await this.productImageRepository.delete({ id });
    return true;
  }

  async removeProductColor(id: string) {
    await this.productColorRepository.delete({ id });
    return true;
  }

  async deleteBulk(createBulkProductDto: createBulkProductDto) {
    const { productIds } = createBulkProductDto;
    productIds.forEach(async (productId) => {
      await this.productRepository.delete({ id: productId });
    });
    return true;
  }

  async removeProductImage(id: string) {
    await this.productImageRepository.delete({ id });
    return true;
  }

  async removeNewArrival(id: string) {
    await this.newArrivalRepository.delete({ id });
    return true;
  }
}
