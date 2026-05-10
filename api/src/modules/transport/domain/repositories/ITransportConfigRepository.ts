import { TransportConfig } from "../entities/TransportConfig";

export interface ITransportConfigRepository {
    find(): Promise<TransportConfig | null>;
    save(config: TransportConfig): Promise<TransportConfig>;
}
