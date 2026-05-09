import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestimonialConfig } from "./domain/entities/testimonial-config.entity";
import { TestimonialsController } from "./infra/http/controllers/testimonials.controller";
import { GetTestimonialsUseCase, UpdateTestimonialsUseCase } from "./application/testimonials.use-cases";
import { TypeOrmTestimonialsRepository } from "./infra/typeorm/repositories/typeorm-testimonials.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TestimonialConfig])],
    controllers: [TestimonialsController],
    providers: [
        GetTestimonialsUseCase,
        UpdateTestimonialsUseCase,
        {
            provide: 'TESTIMONIALS_REPOSITORY_TOKEN',
            useClass: TypeOrmTestimonialsRepository,
        },
    ],
    exports: [GetTestimonialsUseCase],
})
export class TestimonialsModule {}
