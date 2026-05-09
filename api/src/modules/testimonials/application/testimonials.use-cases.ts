import { Inject, Injectable } from "@nestjs/common";
import { TestimonialsRepository } from "../domain/repositories/testimonials.repository";
import { TestimonialConfig } from "../domain/entities/testimonial-config.entity";

export interface UpdateTestimonialsRequest {
    headerBadge?: string;
    headerTitle?: string;
    headerDescription?: string;
    testimonials?: { id: string; name: string; role: string; content: string; imageUrl?: string }[];
}

@Injectable()
export class GetTestimonialsUseCase {
    constructor(
        @Inject('TESTIMONIALS_REPOSITORY_TOKEN')
        private readonly testimonialsRepository: TestimonialsRepository
    ) {}

    async execute() {
        return this.testimonialsRepository.find();
    }
}

@Injectable()
export class UpdateTestimonialsUseCase {
    constructor(
        @Inject('TESTIMONIALS_REPOSITORY_TOKEN')
        private readonly testimonialsRepository: TestimonialsRepository
    ) {}

    async execute(request: UpdateTestimonialsRequest) {
        let config = await this.testimonialsRepository.find();

        if (!config) {
            config = new TestimonialConfig(request);
        } else {
            Object.assign(config, request);
        }

        return this.testimonialsRepository.save(config);
    }
}
