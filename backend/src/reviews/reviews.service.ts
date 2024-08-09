import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { EventsService } from 'src/events/events.service';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly eventService: EventsService,
    private readonly userProfileService: UserProfilesService,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { eventId, userProfileId, comment, stars } = createReviewDto;

    // Check if the event exists using EventService
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if the event has ended
    const currentDate = new Date();
    const eventEndDate = new Date(event.endDate); // Assuming event.endDate is in ISO format
    if (currentDate < eventEndDate) {
      throw new BadRequestException('Cannot post a review before the event has ended');
    }

    // Check if the user profile exists using UserProfileService
    const userProfile = await this.userProfileService.findOne(userProfileId);
    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }

    // Check if a review with the same eventId and userProfileId already exists
    const existingReview = await this.reviewRepository.findOne({
      where: { eventId, userProfileId },
    });

    if (existingReview) {
      throw new ConflictException('Review already exists for this event and user profile');
    }

    // Create and save the new review
    const review = this.reviewRepository.create({
      eventId,
      userProfileId,
      comment,
      stars,
    });

    return this.reviewRepository.save(review);
  }

  async getReview(eventId: number, userProfileId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { eventId, userProfileId } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async updateReview(
    eventId: number,
    userProfileId: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { eventId, userProfileId } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    // Update review fields
    if (updateReviewDto.comment !== undefined) {
      review.comment = updateReviewDto.comment;
      review.commentEditedAt = new Date(); // Update commentEditedAt timestamp
    }
    if (updateReviewDto.stars !== undefined) {
      review.stars = updateReviewDto.stars;
    }

    return this.reviewRepository.save(review);
  }

  async deleteReview(eventId: number, userProfileId: number): Promise<void> {
    const review = await this.reviewRepository.findOne({ where: { eventId, userProfileId } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewRepository.remove(review);
  }

  async getAllReviewsForEvent(eventId: number): Promise<any[]>
  {
    // Fetch all reviews for the event
    const reviews = await this.reviewRepository.find({ where: { eventId } });

    // Use Promise.all to handle asynchronous userName fetching
    const reviewsWithUserNames = await Promise.all(
        reviews.map(async (review) => {
            // Fetch userName for each review's userProfileId
            const userName = await this.userProfileService.getUserNameByUserProfileId(review.userProfileId);
            return {
                ...review, // Include the entire review object
                userName // Include the fetched userName
            };
        })
    );

    return reviewsWithUserNames;
}

}
