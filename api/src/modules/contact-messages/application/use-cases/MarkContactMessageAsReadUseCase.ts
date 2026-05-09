import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IContactMessageRepository } from "../../domain/repositories/IContactMessageRepository";
import { ContactMessage } from "../../domain/entities/ContactMessage";

@Injectable()
export class MarkContactMessageAsReadUseCase {
    constructor(
        @Inject('IContactMessageRepository')
        private contactMessageRepository: IContactMessageRepository
    ) {}

    async execute(id: string): Promise<ContactMessage> {
        const message = await this.contactMessageRepository.findById(id);

        if (!message) {
            throw new NotFoundException('Mensagem não encontrada');
        }

        return this.contactMessageRepository.create({
            ...message,
            read: true
        });
    }
}
