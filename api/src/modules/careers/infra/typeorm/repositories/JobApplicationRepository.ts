import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobApplication } from "../../../domain/entities/JobApplication";
import { IJobApplicationRepository } from "../../../domain/repositories/IJobApplicationRepository";

@Injectable()
export class JobApplicationRepository implements IJobApplicationRepository {
    constructor(
        @InjectRepository(JobApplication)
        private repository: Repository<JobApplication>
    ) {}

    async create(data: Partial<JobApplication>): Promise<JobApplication> {
        const application = this.repository.create(data);
        return this.repository.save(application);
    }

    async findAll(): Promise<JobApplication[]> {
        return this.repository.find({ order: { created_at: 'DESC' } });
    }
}
