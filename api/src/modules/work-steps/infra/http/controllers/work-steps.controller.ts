import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetWorkStepsUseCase } from "../../../application/get-work-steps.use-case";
import { UpdateWorkStepsUseCase, UpdateWorkStepsRequest } from "../../../application/update-work-steps.use-case";

@Controller('work-steps')
export class WorkStepsController {
    constructor(
        private readonly getWorkStepsUseCase: GetWorkStepsUseCase,
        private readonly updateWorkStepsUseCase: UpdateWorkStepsUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getWorkStepsUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateWorkStepsRequest) {
        return this.updateWorkStepsUseCase.execute(body);
    }
}
