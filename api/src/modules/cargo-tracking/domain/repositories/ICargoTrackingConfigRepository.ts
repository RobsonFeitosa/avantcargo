import { CargoTrackingConfig } from '../entities/CargoTrackingConfig';

export interface ICargoTrackingConfigRepository {
    find(): Promise<CargoTrackingConfig | null>;
    save(config: CargoTrackingConfig): Promise<CargoTrackingConfig>;
}
