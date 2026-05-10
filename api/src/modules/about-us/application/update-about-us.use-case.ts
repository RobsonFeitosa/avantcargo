import { Inject, Injectable } from "@nestjs/common";
import { AboutUsRepository } from "../domain/repositories/about-us.repository";
import { AboutUsConfig } from "../domain/entities/about-us-config.entity";

export interface UpdateAboutUsRequest {
    headerBadge?: string;
    headerTitle?: string;
    headerDescription?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    differentials?: { id: string; icon: string; title: string; desc: string }[];
    achievements?: { id: string; icon: string; title: string; desc: string }[];
    historyHeroTitleDark?: string;
    historyHeroTitleOrange?: string;
    historyHeroDescription?: string;
    historyTitle?: string;
    historyText?: string;
    historyTimeline?: { id: string; year: string; text: string }[];
    valuesBadge?: string;
    valuesTitle1?: string;
    valuesTitleHighlight?: string;
    valuesList?: { id: string; icon: string; title: string; desc: string }[];
    differentialsBadge?: string;
    differentialsTitle1?: string;
    differentialsTitleHighlight?: string;
    differentialsList?: { id: string; icon: string; title: string; desc: string }[];
    foundersBadge?: string;
    foundersTitle?: string;
    foundersTitleHighlight?: string;
    founder1Cargo?: string;
    founder1Name?: string;
    founder1Subtitle?: string;
    founder1Bio?: string;
    founder1ButtonText?: string;
    founder1ButtonLink?: string;
    founder1Image?: string;
    founder2Cargo?: string;
    founder2Name?: string;
    founder2Subtitle?: string;
    founder2Bio?: string;
    founder2ButtonText?: string;
    founder2ButtonLink?: string;
    founder2Image?: string;
    ctaTitleDark?: string;
    ctaTitleHighlight?: string;
    ctaDescription?: string;
    ctaPrimaryButtonText?: string;
    ctaPrimaryButtonLink?: string;
    ctaSecondaryButtonText?: string;
    ctaSecondaryButtonLink?: string;
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
