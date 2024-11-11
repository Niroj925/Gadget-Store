import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { reviewEntity } from 'src/model/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(reviewEntity)
    private readonly reviewRepository: Repository<reviewEntity>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const { rating, review, customerId, productId } = createReviewDto;
    const existingReview = await this.reviewRepository.findOne({
      where: { customer: { id: customerId }, product: { id: productId } },
    });
    if (existingReview) {
      console.log('review exist');
      const updatedReview = Object.assign(existingReview, createReviewDto);
      await this.reviewRepository.save(updatedReview);
      return true;
    }
    console.log('create new review');
    const newReview = this.reviewRepository.create({
      rating,
      review,
      product: { id: productId },
      customer: { id: customerId },
    });
    await this.reviewRepository.save(newReview);
    return true;
  }

  async findAll(id: string) {
    console.log(id);
    const reviews = await this.reviewRepository.find({
      where: { product: { id } },
    });    
    return reviews;
  }

  async findOne(id: string) {
    return await this.reviewRepository.findOne({ where: { id } });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    const updatedReview = Object.assign(review, updateReviewDto);
    await this.reviewRepository.save(updatedReview);
    return true;
  }

  async remove(id: string) {
    await this.reviewRepository.delete({ id });
    return true;
  }
}
