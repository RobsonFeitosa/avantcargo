import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CareersConfig } from "./domain/entities/CareersConfig";
import { JobApplication } from "./domain/entities/JobApplication";
import { CareersConfigRepository } from "./infra/typeorm/repositories/CareersConfigRepository";
import { JobApplicationRepository } from "./infra/typeorm/repositories/JobApplicationRepository";
import { GetCareersConfigUseCase } from "./application/use-cases/GetCareersConfigUseCase";
import { UpdateCareersConfigUseCase } from "./application/use-cases/UpdateCareersConfigUseCase";
import { CreateJobApplicationUseCase } from "./application/use-cases/CreateJobApplicationUseCase";
import { CareersConfigController } from "./infra/http/controllers/CareersConfigController";
import { JobApplicationsController } from "./infra/http/controllers/JobApplicationsController";
import { MailModule } from "src/shared/infra/mail/mail.module";
import { UploadModule } from "src/shared/infra/http/uploads.module";
import { StorageModule } from "src/shared/infra/http/providers/storage-provider/storage.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CareersConfig, JobApplication]),
        MailModule,
        UploadModule,
        StorageModule.register()
    ],
    providers: [
        {
            provide: 'ICareersConfigRepository',
            useClass: CareersConfigRepository
        },
        {
            provide: 'IJobApplicationRepository',
            useClass: JobApplicationRepository
        },
        GetCareersConfigUseCase,
        UpdateCareersConfigUseCase,
        CreateJobApplicationUseCase
    ],
    controllers: [
        CareersConfigController,
        JobApplicationsController
    ]
})
export class CareersModule {}
