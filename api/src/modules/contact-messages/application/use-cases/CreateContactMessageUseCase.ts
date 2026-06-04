import { Inject, Injectable, Logger } from "@nestjs/common";
import { IContactMessageRepository } from "../../domain/repositories/IContactMessageRepository";
import { ContactMessage } from "../../domain/entities/ContactMessage";
import { MailService } from "src/shared/infra/mail/mail.service";
import { contactMessageTemplate } from "src/shared/infra/mail/templates/contact-message.template";

interface IRequest {
    name: string;
    company?: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

@Injectable()
export class CreateContactMessageUseCase {
    private readonly logger = new Logger(CreateContactMessageUseCase.name);

    constructor(
        @Inject('IContactMessageRepository')
        private contactMessageRepository: IContactMessageRepository,
        private mailService: MailService,
    ) {}

    async execute(data: IRequest): Promise<ContactMessage> {
        const saved = await this.contactMessageRepository.create(data);

        try {
            await this.mailService.send({
                to: "robson.gw@hotmail.com",
                subject: `Nova mensagem de ${data.name} — ${data.service || "Contato"}`,
                html: contactMessageTemplate(data),
            });
        } catch (err) {
            this.logger.error("Falha ao enviar email de contato", err);
        }

        return saved;
    }
}
