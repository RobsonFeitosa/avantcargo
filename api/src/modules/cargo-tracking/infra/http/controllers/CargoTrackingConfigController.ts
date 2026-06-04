import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetCargoTrackingConfigUseCase } from "../../../application/use-cases/GetCargoTrackingConfigUseCase";
import { UpdateCargoTrackingConfigUseCase } from "../../../application/use-cases/UpdateCargoTrackingConfigUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('cargo-tracking-config')
export class CargoTrackingConfigController {
    constructor(
        private getUseCase: GetCargoTrackingConfigUseCase,
        private updateUseCase: UpdateCargoTrackingConfigUseCase
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
