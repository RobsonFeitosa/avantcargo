import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetMainServicesUseCase } from "../../../application/get-main-services.use-case";
import { UpdateMainServicesUseCase, UpdateMainServicesRequest } from "../../../application/update-main-services.use-case";

@Controller('main-services')
export class MainServicesController {
    constructor(
        private readonly getMainServicesUseCase: GetMainServicesUseCase,
        private readonly updateMainServicesUseCase: UpdateMainServicesUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getMainServicesUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateMainServicesRequest) {
        return this.updateMainServicesUseCase.execute(body);
    }
}
