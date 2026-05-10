import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetComexSystemsConfigUseCase } from "../../../application/use-cases/GetComexSystemsConfigUseCase";
import { UpdateComexSystemsConfigUseCase } from "../../../application/use-cases/UpdateComexSystemsConfigUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('comex-systems-config')
export class ComexSystemsConfigController {
    constructor(
        private getUseCase: GetComexSystemsConfigUseCase,
        private updateUseCase: UpdateComexSystemsConfigUseCase
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
