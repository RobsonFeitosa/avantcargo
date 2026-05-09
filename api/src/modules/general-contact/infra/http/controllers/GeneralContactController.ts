import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetGeneralContactConfigUseCase } from "../../../application/use-cases/GetGeneralContactConfigUseCase";
import { UpdateGeneralContactConfigUseCase } from "../../../application/use-cases/UpdateGeneralContactConfigUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('general-contact')
export class GeneralContactController {
    constructor(
        private getGeneralContactConfigUseCase: GetGeneralContactConfigUseCase,
        private updateGeneralContactConfigUseCase: UpdateGeneralContactConfigUseCase
    ) {}

    @Public()
    @Get()
    async get() {
        return this.getGeneralContactConfigUseCase.execute();
    }

    @Post()
    async update(@Body() data: any) {
        return this.updateGeneralContactConfigUseCase.execute(data);
    }
}
