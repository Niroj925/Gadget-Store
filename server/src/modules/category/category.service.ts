import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { categoryEntity } from 'src/model/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(categoryEntity)
    private readonly categoryRepository: Repository<categoryEntity>,
  ) {}

  async create(id: string, createCategoryDto: CreateCategoryDto) {
    console.log(id);
    console.log(createCategoryDto);
    const category = this.categoryRepository.create({
      name: createCategoryDto.name,
      admin: { id },
    });
    this.categoryRepository.save(category);
    return true;
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
      relations: ['product'],
      select: {
        id: true,
        name: true,
      },
    });
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      productCount: category.product.length,
    }));
  }


  async findOne(id: string) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async findProduct(id:string){
    const category=await this.categoryRepository.findOne({
      where:{id},
      relations:['product.image'],
    },
    );

    return {
      id: category.id,
      name: category.name,
      products: category.product.map((product) => ({
        id:product.id,
        name: product.name,
        price:product.price,
        status:product.status,
        image: product.image[0].image,
      })),
    };
  }

  

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(
      { id },
      { name: updateCategoryDto.name },
    );
    return true;
  }

  async remove(id: string) {
    await this.categoryRepository.delete({ id });
    return true;
  }
}
