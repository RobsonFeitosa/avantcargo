import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetRegionsUseCase, UpdateRegionsUseCase, UpdateRegionsRequest } from "../../../application/regions.use-cases";

@Controller('regions')
export class RegionsController {
    constructor(
        private readonly getRegionsUseCase: GetRegionsUseCase,
        private readonly updateRegionsUseCase: UpdateRegionsUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getRegionsUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateRegionsRequest) {
        return this.updateRegionsUseCase.execute(body);
    }
}
