import { Inject, Injectable } from "@nestjs/common";
import { AboutUsRepository } from "../domain/repositories/about-us.repository";
import { AboutUsConfig } from "../domain/entities/about-us-config.entity";

export interface UpdateAboutUsRequest {
    headerBadge?: string;
    headerTitle?: string;
    headerDescription?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    differentials?: { id: string; title: string; desc: string }[];
    achievements?: { id: string; title: string; desc: string }[];
}

@Injectable()
export class UpdateAboutUsUseCase {
    constructor(
        @Inject('ABOUT_US_REPOSITORY_TOKEN')
        private readonly aboutUsRepository: AboutUsRepository
    ) {}

    async execute(request: UpdateAboutUsRequest) {
        let config = await this.aboutUsRepository.find();

        if (!config) {
            config = new AboutUsConfig(request);
        } else {
            Object.assign(config, request);
        }

        return this.aboutUsRepository.save(config);
    }
}
