import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetCubageCalculationConfigUseCase } from "../../../application/use-cases/GetCubageCalculationConfigUseCase";
import { UpdateCubageCalculationConfigUseCase } from "../../../application/use-cases/UpdateCubageCalculationConfigUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('cubage-calculation-config')
export class CubageCalculationConfigController {
    constructor(
        private getUseCase: GetCubageCalculationConfigUseCase,
        private updateUseCase: UpdateCubageCalculationConfigUseCase
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
