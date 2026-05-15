import { RegionConfig } from "../entities/region-config.entity";

export interface RegionsRepository {
    find(): Promise<RegionConfig | null>;
    save(config: RegionConfig): Promise<RegionConfig>;
}
