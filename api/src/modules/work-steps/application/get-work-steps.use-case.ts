import { Inject, Injectable } from "@nestjs/common";
import { WorkStepsRepository } from "../domain/repositories/work-steps.repository";

@Injectable()
export class GetWorkStepsUseCase {
    constructor(
        @Inject('WORK_STEPS_REPOSITORY_TOKEN')
        private readonly workStepsRepository: WorkStepsRepository
    ) {}

    async execute() {
        return this.workStepsRepository.find();
    }
}
