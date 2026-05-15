import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetRegionsUseCase, UpdateRegionsUseCase, UpdateRegionsRequest } from "../../../application/regions.use-cases";

@Controller('regions')
export class RegionsController {
    constructor(
        private readonly getRegionsUseCase: GetRegionsUseCase,
        private readonly updateRegionsUseCase: UpdateRegionsUseCase,
    ) {}

    @Get(':page')
    @Public()
    async getByPage(@Param('page') page: string) {
        return this.getRegionsUseCase.execute(page);
    }

    @Get()
    @Public()
    async get() {
        return this.getRegionsUseCase.execute('home');
    }

    @Post(':page')
    async update(@Param('page') page: string, @Body() body: UpdateRegionsRequest) {
        return this.updateRegionsUseCase.execute(page, body);
    }
}
