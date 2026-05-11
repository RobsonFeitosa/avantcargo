import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetCareersConfigUseCase } from "../../../application/use-cases/GetCareersConfigUseCase";
import { UpdateCareersConfigUseCase } from "../../../application/use-cases/UpdateCareersConfigUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('careers-config')
export class CareersConfigController {
    constructor(
        private getUseCase: GetCareersConfigUseCase,
        private updateUseCase: UpdateCareersConfigUseCase
    ) {}

    @Public()
    @Get()
    async get() {
        return this.getUseCase.execute();
    }

    @Post()
    async update(@Body() data: any) {
        return this.updateUseCase.execute(data);
    }
}
