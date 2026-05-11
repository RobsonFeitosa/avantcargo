import { JobApplication } from "../entities/JobApplication";

export interface IJobApplicationRepository {
    create(data: Partial<JobApplication>): Promise<JobApplication>;
    findAll(): Promise<JobApplication[]>;
}
