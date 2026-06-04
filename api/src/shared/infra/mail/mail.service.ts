import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

export interface SendMailOptions {
    to?: string;
    subject: string;
    html: string;
    attachments?: { filename: string; path: string }[];
}

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(MailService.name);

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "dedrelay.secureserver.net",
            port: 25,
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async send({ to, subject, html, attachments }: SendMailOptions): Promise<void> {
        const recipient = to || "robson.gw@hotmail.com";

        this.logger.log(`Enviando e-mail para: ${recipient}`);

        await this.transporter.sendMail({
            from: '"Avant Cargo" <comercial@avantcargo.com.br>',
            to: recipient,
            subject,
            html,
            attachments,
        });

        this.logger.log(`E-mail enviado com sucesso para: ${recipient}`);
    }
}
