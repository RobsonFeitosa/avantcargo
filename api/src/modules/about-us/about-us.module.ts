import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AboutUsConfig } from "./domain/entities/about-us-config.entity";
import { AboutUsController } from "./infra/http/controllers/about-us.controller";
import { GetAboutUsUseCase } from "./application/get-about-us.use-case";
import { UpdateAboutUsUseCase } from "./application/update-about-us.use-case";
import { TypeOrmAboutUsRepository } from "./infra/typeorm/repositories/typeorm-about-us.repository";

@Module({
    imports: [TypeOrmModule.forFeature([AboutUsConfig])],
    controllers: [AboutUsController],
    providers: [
        GetAboutUsUseCase,
        UpdateAboutUsUseCase,
        {
            provide: 'ABOUT_US_REPOSITORY_TOKEN',
            useClass: TypeOrmAboutUsRepository,
        },
    ],
    exports: [GetAboutUsUseCase],
})
export class AboutUsModule {}
