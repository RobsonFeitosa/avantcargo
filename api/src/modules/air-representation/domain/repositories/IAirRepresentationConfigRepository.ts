import { AirRepresentationConfig } from "../entities/AirRepresentationConfig";

export interface IAirRepresentationConfigRepository {
    find(): Promise<AirRepresentationConfig | null>;
    save(config: AirRepresentationConfig): Promise<AirRepresentationConfig>;
}
