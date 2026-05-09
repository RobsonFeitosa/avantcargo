import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetTestimonialsUseCase, UpdateTestimonialsUseCase, UpdateTestimonialsRequest } from "../../../application/testimonials.use-cases";

@Controller('testimonials')
export class TestimonialsController {
    constructor(
        private readonly getTestimonialsUseCase: GetTestimonialsUseCase,
        private readonly updateTestimonialsUseCase: UpdateTestimonialsUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getTestimonialsUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateTestimonialsRequest) {
        return this.updateTestimonialsUseCase.execute(body);
    }
}
