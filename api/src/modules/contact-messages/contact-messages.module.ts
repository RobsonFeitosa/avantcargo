import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactMessage } from "./domain/entities/ContactMessage";
import { ContactMessageRepository } from "./infra/typeorm/repositories/ContactMessageRepository";
import { CreateContactMessageUseCase } from "./application/use-cases/CreateContactMessageUseCase";
import { ListContactMessagesUseCase } from "./application/use-cases/ListContactMessagesUseCase";
import { DeleteContactMessageUseCase } from "./application/use-cases/DeleteContactMessageUseCase";
import { MarkContactMessageAsReadUseCase } from "./application/use-cases/MarkContactMessageAsReadUseCase";
import { ContactMessageController } from "./infra/http/controllers/ContactMessageController";
import { MailModule } from "src/shared/infra/mail/mail.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ContactMessage]),
        MailModule,
    ],
    providers: [
        {
            provide: 'IContactMessageRepository',
            useClass: ContactMessageRepository,
        },
        CreateContactMessageUseCase,
        ListContactMessagesUseCase,
        DeleteContactMessageUseCase,
        MarkContactMessageAsReadUseCase,
    ],
    controllers: [ContactMessageController],
})
export class ContactMessageModule {}
