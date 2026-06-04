import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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
      host: 'dedrelay.secureserver.net',
      port: 25,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send({
    to,
    subject,
    html,
    attachments,
  }: SendMailOptions): Promise<void> {
    const recipient = to || 'comercial@avantcargo.com.br';
    const fromEmail = 'comercial@avantcargo.com.br';
    const fromName = 'Avant Cargo';

    this.logger.log(`Enviando e-mail para: ${recipient}`);

    const plainText = html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    await this.transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: recipient,
      replyTo: `"${fromName}" <${fromEmail}>`,
      subject,
      text: plainText,
      html,
      attachments,
      headers: {
        'X-Mailer': 'AvantCargo Mailer 1.0',
        'X-Priority': '3',
        Importance: 'Normal',
      },
    });

    this.logger.log(`E-mail enviado com sucesso para: ${recipient}`);
  }
}
