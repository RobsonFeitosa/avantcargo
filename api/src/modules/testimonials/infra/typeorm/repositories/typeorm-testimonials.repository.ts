import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TestimonialConfig } from "../../../domain/entities/testimonial-config.entity";
import { TestimonialsRepository } from "../../../domain/repositories/testimonials.repository";

@Injectable()
export class TypeOrmTestimonialsRepository implements TestimonialsRepository {
    constructor(
        @InjectRepository(TestimonialConfig)
        private readonly repository: Repository<TestimonialConfig>
    ) {}

    async find(): Promise<TestimonialConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: TestimonialConfig): Promise<TestimonialConfig> {
        return this.repository.save(config);
    }
}
