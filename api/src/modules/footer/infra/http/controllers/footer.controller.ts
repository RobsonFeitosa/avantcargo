import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetFooterUseCase, UpdateFooterUseCase, UpdateFooterRequest } from "../../../application/footer.use-cases";

@Controller('footer')
export class FooterController {
    constructor(
        private readonly getFooterUseCase: GetFooterUseCase,
        private readonly updateFooterUseCase: UpdateFooterUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getFooterUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateFooterRequest) {
        return this.updateFooterUseCase.execute(body);
    }
}
