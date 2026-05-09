import { WorkStepConfig } from "../entities/work-step-config.entity";

export interface WorkStepsRepository {
    find(): Promise<WorkStepConfig | null>;
    save(config: WorkStepConfig): Promise<WorkStepConfig>;
}
