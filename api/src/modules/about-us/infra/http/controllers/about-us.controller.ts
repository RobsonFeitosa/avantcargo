import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetAboutUsUseCase } from "../../../application/get-about-us.use-case";
import { UpdateAboutUsUseCase, UpdateAboutUsRequest } from "../../../application/update-about-us.use-case";

@Controller('about-us')
export class AboutUsController {
    constructor(
        private readonly getAboutUsUseCase: GetAboutUsUseCase,
        private readonly updateAboutUsUseCase: UpdateAboutUsUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getAboutUsUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateAboutUsRequest) {
        return this.updateAboutUsUseCase.execute(body);
    }
}
