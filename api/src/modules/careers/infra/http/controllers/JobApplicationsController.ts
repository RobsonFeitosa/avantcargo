import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, Inject } from "@nestjs/common";
import { CreateJobApplicationUseCase } from "../../../application/use-cases/CreateJobApplicationUseCase";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobApplication } from "../../../domain/entities/JobApplication";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import uploadConfig from "src/shared/infra/http/constants/upload";
import { IStorageProvider } from "src/shared/infra/http/providers/storage-provider/models/i-storage-provider";

@Controller('job-applications')
export class JobApplicationsController {
    constructor(
        private createUseCase: CreateJobApplicationUseCase,
        @InjectRepository(JobApplication)
        private repo: Repository<JobApplication>,
        @Inject('STORAGE_PROVIDER')
        private storageProvider: IStorageProvider
    ) {}

    @Public()
    @Post()
    @UseInterceptors(FileInterceptor('file', uploadConfig.multer))
    async create(@Body() data: any, @UploadedFile() file?: Express.Multer.File) {
        if (file) {
            data.resumeFile = await this.storageProvider.saveFile(file.filename);
        }
        return this.createUseCase.execute(data);
    }

    @Get()
    async list() {
        return this.repo.find({ order: { created_at: 'DESC' } });
    }
}
