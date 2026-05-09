import { Module } from "@nestjs/common";
import { StorageModule } from "./providers/storage-provider/storage.module";
import { UploadController } from "./controllers/UploadController";

@Module({
    imports: [StorageModule.register()],
    controllers: [UploadController],
})
export class UploadModule {}
