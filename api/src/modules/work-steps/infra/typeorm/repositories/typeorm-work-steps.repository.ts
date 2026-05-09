import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WorkStepConfig } from "../../../domain/entities/work-step-config.entity";
import { WorkStepsRepository } from "../../../domain/repositories/work-steps.repository";

@Injectable()
export class TypeOrmWorkStepsRepository implements WorkStepsRepository {
    constructor(
        @InjectRepository(WorkStepConfig)
        private readonly repository: Repository<WorkStepConfig>
    ) {}

    async find(): Promise<WorkStepConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: WorkStepConfig): Promise<WorkStepConfig> {
        return this.repository.save(config);
    }
}
