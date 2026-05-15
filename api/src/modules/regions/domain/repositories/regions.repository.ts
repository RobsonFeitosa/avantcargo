import { RegionConfig } from "../entities/region-config.entity";

export interface RegionsRepository {
    findByPage(page: string): Promise<RegionConfig | null>;
    save(config: RegionConfig): Promise<RegionConfig>;
}
