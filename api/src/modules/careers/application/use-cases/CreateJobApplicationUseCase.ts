import { Inject, Injectable, Logger } from "@nestjs/common";
import { IJobApplicationRepository } from "../../domain/repositories/IJobApplicationRepository";
import { JobApplication } from "../../domain/entities/JobApplication";
import { MailService } from "src/shared/infra/mail/mail.service";
import * as path from "path";
import uploadConfig from "src/shared/infra/http/constants/upload";

interface IRequest {
    name: string;
    email: string;
    phone: string;
    message?: string;
    resumeFile?: string;
}

@Injectable()
export class CreateJobApplicationUseCase {
    private readonly logger = new Logger(CreateJobApplicationUseCase.name);

    constructor(
        @Inject('IJobApplicationRepository')
        private repository: IJobApplicationRepository,
        private mailService: MailService,
    ) {}

    async execute(data: IRequest): Promise<JobApplication> {
        const saved = await this.repository.create(data);

        try {
            const attachments: { filename: string; path: string }[] = [];
            if (data.resumeFile) {
                attachments.push({
                    filename: data.resumeFile,
                    path: path.resolve(uploadConfig.uploadsFolder, data.resumeFile)
                });
            }

            const html = `
                <h2>Nova Candidatura Recebida</h2>
                <p><strong>Nome:</strong> ${data.name}</p>
                <p><strong>E-mail:</strong> ${data.email}</p>
                <p><strong>Telefone:</strong> ${data.phone}</p>
                <p><strong>Mensagem:</strong> ${data.message || 'Não informada'}</p>
                <p><em>Curriculo em anexo (se enviado).</em></p>
            `;

            await this.mailService.send({
                to: "robson.gw@hotmail.com",
                subject: `Nova candidatura — ${data.name}`,
                html,
                attachments: attachments.length > 0 ? attachments : undefined
            });
        } catch (err) {
            this.logger.error("Falha ao enviar email de candidatura", err);
        }

        return saved;
    }
}
