import { GeneralContactConfig } from "../entities/general-contact-config.entity";

export interface IGeneralContactConfigRepository {
    get(): Promise<GeneralContactConfig | null>;
    save(data: GeneralContactConfig): Promise<GeneralContactConfig>;
}
