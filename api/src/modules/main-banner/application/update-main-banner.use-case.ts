import { Inject, Injectable } from "@nestjs/common";
import { MainBannerRepository } from "../domain/repositories/main-banner.repository";
import { MainBanner } from "../domain/entities/main-banner.entity";

export interface UpdateMainBannerRequest {
    heroBadge?: string;
    heroTitle?: string;
    heroDescription?: string;
    heroPrimaryButtonText?: string;
    heroSecondaryButtonText?: string;
    features?: { id: string; text: string }[];
    servicesSectionTitle?: string;
    services?: { id: string; title: string; desc: string }[];
    stats?: { id: string; value: string; label: string }[];
    footer_stats?: { id: string; value: string; label: string }[];
}

@Injectable()
export class UpdateMainBannerUseCase {
    constructor(
        @Inject('MAIN_BANNER_REPOSITORY_TOKEN')
        private readonly mainBannerRepository: MainBannerRepository
    ) {}

    async execute(request: UpdateMainBannerRequest) {
        let mainBanner = await this.mainBannerRepository.find();

        if (!mainBanner) {
            mainBanner = new MainBanner(request);
        } else {
            Object.assign(mainBanner, request);
        }

        return this.mainBannerRepository.save(mainBanner);
    }
}
