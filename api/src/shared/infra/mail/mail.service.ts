import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

export interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
    attachments?: { filename: string; path: string }[];
}

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "dedrelay.secureserver.net",
            port: 25,
            secure: false,
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
        });
    }

    async send({ to, subject, html, attachments }: SendMailOptions): Promise<void> {
        const recipient = to || "robson.gw@hotmail.com";
        await this.transporter.sendMail({
            from: '"Avant Cargo" <robson.gw@hotmail.com>',
            to: recipient,
            subject,
            html,
            attachments,
        });
    }
}
