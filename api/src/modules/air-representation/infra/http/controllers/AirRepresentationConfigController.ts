import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetAirRepresentationConfigUseCase } from "../../../application/use-cases/GetAirRepresentationConfigUseCase";
import { UpdateAirRepresentationConfigUseCase } from "../../../application/use-cases/UpdateAirRepresentationConfigUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('air-representation-config')
export class AirRepresentationConfigController {
    constructor(
        private getUseCase: GetAirRepresentationConfigUseCase,
        private updateUseCase: UpdateAirRepresentationConfigUseCase
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
