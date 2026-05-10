import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetTransportConfigUseCase } from "../../../application/use-cases/GetTransportConfigUseCase";
import { UpdateTransportConfigUseCase } from "../../../application/use-cases/UpdateTransportConfigUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('transport-config')
export class TransportConfigController {
    constructor(
        private getUseCase: GetTransportConfigUseCase,
        private updateUseCase: UpdateTransportConfigUseCase
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
