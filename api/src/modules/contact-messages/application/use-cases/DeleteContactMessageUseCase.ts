import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IContactMessageRepository } from "../../domain/repositories/IContactMessageRepository";

@Injectable()
export class DeleteContactMessageUseCase {
    constructor(
        @Inject('IContactMessageRepository')
        private contactMessageRepository: IContactMessageRepository
    ) {}

    async execute(id: string): Promise<void> {
        const message = await this.contactMessageRepository.findById(id);

        if (!message) {
            throw new NotFoundException('Mensagem não encontrada');
        }

        await this.contactMessageRepository.delete(id);
    }
}
