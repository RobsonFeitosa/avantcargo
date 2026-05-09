import { Inject, Injectable } from "@nestjs/common";
import { IGeneralContactConfigRepository } from "../../domain/repositories/IGeneralContactConfigRepository";

@Injectable()
export class GetGeneralContactConfigUseCase {
    constructor(
        @Inject('IGeneralContactConfigRepository')
        private generalContactConfigRepository: IGeneralContactConfigRepository
    ) {}

    async execute() {
        return this.generalContactConfigRepository.get();
    }
}
