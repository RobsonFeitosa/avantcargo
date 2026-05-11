import { CareersConfig } from "../entities/CareersConfig";

export interface ICareersConfigRepository {
    find(): Promise<CareersConfig | null>;
    save(config: CareersConfig): Promise<CareersConfig>;
}
