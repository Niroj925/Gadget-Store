import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { reviewEntity } from 'src/model/review.entity';

@Module({
  imports:[TypeOrmModule.forFeature([reviewEntity])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
