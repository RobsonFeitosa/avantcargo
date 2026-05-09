import { Inject, Injectable } from "@nestjs/common";
import { HomeContactRepository } from "../domain/repositories/home-contact.repository";
import { HomeContactConfig } from "../domain/entities/home-contact-config.entity";

export interface UpdateHomeContactRequest {
    headerBadge?: string;
    headerTitle?: string;
    headerDescription?: string;
    ctaText?: string;
    ctaSubtext?: string;
    features?: { id: string; text: string }[];
    primaryButton?: { text: string; link: string };
    secondaryButton?: { text: string; link: string };
    textLink?: { text: string; link: string };
}

@Injectable()
export class GetHomeContactUseCase {
    constructor(
        @Inject('HOME_CONTACT_REPOSITORY_TOKEN')
        private readonly homeContactRepository: HomeContactRepository
    ) {}

    async execute() {
        return this.homeContactRepository.find();
    }
}

@Injectable()
export class UpdateHomeContactUseCase {
    constructor(
        @Inject('HOME_CONTACT_REPOSITORY_TOKEN')
        private readonly homeContactRepository: HomeContactRepository
    ) {}

    async execute(request: UpdateHomeContactRequest) {
        let config = await this.homeContactRepository.find();

        if (!config) {
            config = new HomeContactConfig(request);
        } else {
            Object.assign(config, request);
        }

        return this.homeContactRepository.save(config);
    }
}
