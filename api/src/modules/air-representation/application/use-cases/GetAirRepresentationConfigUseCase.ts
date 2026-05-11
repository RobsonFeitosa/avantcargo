import { Inject, Injectable } from "@nestjs/common";
import { IAirRepresentationConfigRepository } from "../../domain/repositories/IAirRepresentationConfigRepository";
import { AirRepresentationConfig } from "../../domain/entities/AirRepresentationConfig";

@Injectable()
export class GetAirRepresentationConfigUseCase {
    constructor(
        @Inject('IAirRepresentationConfigRepository')
        private repository: IAirRepresentationConfigRepository
    ) {}

    async execute(): Promise<AirRepresentationConfig> {
        const existing = await this.repository.find();
        if (existing) return existing;
        return this.repository.save(new AirRepresentationConfig({}));
    }
}
