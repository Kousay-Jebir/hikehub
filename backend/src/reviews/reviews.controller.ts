import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('event/:eventId')
  async getAllReviewsForEvent(
  @Param('eventId') eventId: number):Promise<any[]>{
    return this.reviewService.getAllReviewsForEvent(eventId);
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get(':eventId/:userProfileId')
  async getReview(
    @Param('eventId') eventId: number,
    @Param('userProfileId') userProfileId: number
  ): Promise<Review> {
    return this.reviewService.getReview(eventId, userProfileId);
  }

  @Put(':eventId/:userProfileId')
  async updateReview(
    @Param('eventId') eventId: number,
    @Param('userProfileId') userProfileId: number,
    @Body() updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    return this.reviewService.updateReview(eventId, userProfileId, updateReviewDto);
  }

  @Delete(':eventId/:userProfileId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(
    @Param('eventId') eventId: number,
    @Param('userProfileId') userProfileId: number
  ): Promise<void> {
    return this.reviewService.deleteReview(eventId, userProfileId);
  }

}
