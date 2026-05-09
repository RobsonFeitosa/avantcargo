import { Inject, Injectable } from "@nestjs/common";
import { IContactMessageRepository } from "../../domain/repositories/IContactMessageRepository";
import { ContactMessage } from "../../domain/entities/ContactMessage";

@Injectable()
export class ListContactMessagesUseCase {
    constructor(
        @Inject('IContactMessageRepository')
        private contactMessageRepository: IContactMessageRepository
    ) {}

    async execute(): Promise<ContactMessage[]> {
        return this.contactMessageRepository.findAll();
    }
}
