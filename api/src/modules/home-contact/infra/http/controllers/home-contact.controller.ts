import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetHomeContactUseCase, UpdateHomeContactUseCase, UpdateHomeContactRequest } from "../../../application/home-contact.use-cases";

@Controller('home-contact')
export class HomeContactController {
    constructor(
        private readonly getHomeContactUseCase: GetHomeContactUseCase,
        private readonly updateHomeContactUseCase: UpdateHomeContactUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getHomeContactUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateHomeContactRequest) {
        return this.updateHomeContactUseCase.execute(body);
    }
}
