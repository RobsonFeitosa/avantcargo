import { SectorConfig } from "../entities/sector-config.entity";

export interface SectorsRepository {
    find(): Promise<SectorConfig | null>;
    save(config: SectorConfig): Promise<SectorConfig>;
}
