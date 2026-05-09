import { Inject, Injectable } from "@nestjs/common";
import { MainServicesRepository } from "../domain/repositories/main-services.repository";

@Injectable()
export class GetMainServicesUseCase {
    constructor(
        @Inject('MAIN_SERVICES_REPOSITORY_TOKEN')
        private readonly mainServicesRepository: MainServicesRepository
    ) {}

    async execute() {
        return this.mainServicesRepository.find();
    }
}
