import { DynamicModule, Module } from "@nestjs/common";
import { DiskStorageProvider } from "./implementations/disk-storage-provider";
import { ConfigModule } from "@nestjs/config";

@Module({})
export class StorageModule {
    static register(): DynamicModule {
        return {
            module: StorageModule,
            imports: [ConfigModule],
            providers: [
                {
                    provide: "STORAGE_PROVIDER",
                    useClass: DiskStorageProvider,
                },
            ],
            exports: ["STORAGE_PROVIDER"],
        };
    }
}