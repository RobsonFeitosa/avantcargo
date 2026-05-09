import { Inject, Injectable } from "@nestjs/common";
import { WorkStepsRepository } from "../domain/repositories/work-steps.repository";
import { WorkStepConfig } from "../domain/entities/work-step-config.entity";

export interface UpdateWorkStepsRequest {
    headerBadge?: string;
    headerTitle?: string;
    headerDescription?: string;
    ctaText?: string;
    steps?: { id: string; title: string; desc: string }[];
}

@Injectable()
export class UpdateWorkStepsUseCase {
    constructor(
        @Inject('WORK_STEPS_REPOSITORY_TOKEN')
        private readonly workStepsRepository: WorkStepsRepository
    ) {}

    async execute(request: UpdateWorkStepsRequest) {
        let config = await this.workStepsRepository.find();

        if (!config) {
            config = new WorkStepConfig(request);
        } else {
            Object.assign(config, request);
        }

        return this.workStepsRepository.save(config);
    }
}
