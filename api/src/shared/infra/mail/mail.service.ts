import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

export interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || "smtp.office365.com",
        port: Number(process.env.MAIL_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
    });

    async send({ to, subject, html }: SendMailOptions): Promise<void> {
        await this.transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME || "Avant Cargo"}" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });
    }
}
