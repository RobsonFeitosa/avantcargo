import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetMainBannerUseCase } from "../../../application/get-main-banner.use-case";
import { UpdateMainBannerUseCase, UpdateMainBannerRequest } from "../../../application/update-main-banner.use-case";

@Controller('main-banner')
export class MainBannerController {
    constructor(
        private readonly getMainBannerUseCase: GetMainBannerUseCase,
        private readonly updateMainBannerUseCase: UpdateMainBannerUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getMainBannerUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateMainBannerRequest) {
        return this.updateMainBannerUseCase.execute(body);
    }
}
