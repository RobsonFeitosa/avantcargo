import { TestimonialConfig } from "../entities/testimonial-config.entity";

export interface TestimonialsRepository {
    find(): Promise<TestimonialConfig | null>;
    save(config: TestimonialConfig): Promise<TestimonialConfig>;
}
