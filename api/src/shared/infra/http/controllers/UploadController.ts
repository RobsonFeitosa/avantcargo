import { 
    Controller, 
    Post, 
    UploadedFile, 
    UseInterceptors, 
    Inject 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { IStorageProvider } from "../providers/storage-provider/models/i-storage-provider";
import uploadConfig from "../constants/upload";

@Controller('uploads')
export class UploadController {
    constructor(
        @Inject('STORAGE_PROVIDER')
        private storageProvider: IStorageProvider
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', uploadConfig.multer))
    async upload(@UploadedFile() file: Express.Multer.File) {
        const fileName = await this.storageProvider.saveFile(file.filename);
        
        return {
            fileName,
            url: `${process.env.APP_API_URL}/files/${fileName}`
        };
    }
}
