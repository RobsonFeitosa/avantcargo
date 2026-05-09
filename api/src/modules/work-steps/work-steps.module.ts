import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkStepConfig } from "./domain/entities/work-step-config.entity";
import { WorkStepsController } from "./infra/http/controllers/work-steps.controller";
import { GetWorkStepsUseCase } from "./application/get-work-steps.use-case";
import { UpdateWorkStepsUseCase } from "./application/update-work-steps.use-case";
import { TypeOrmWorkStepsRepository } from "./infra/typeorm/repositories/typeorm-work-steps.repository";

@Module({
    imports: [TypeOrmModule.forFeature([WorkStepConfig])],
    controllers: [WorkStepsController],
    providers: [
        GetWorkStepsUseCase,
        UpdateWorkStepsUseCase,
        {
            provide: 'WORK_STEPS_REPOSITORY_TOKEN',
            useClass: TypeOrmWorkStepsRepository,
        },
    ],
    exports: [GetWorkStepsUseCase],
})
export class WorkStepsModule {}
