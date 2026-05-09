import { Inject, Injectable } from "@nestjs/common";
import { IContactMessageRepository } from "../../domain/repositories/IContactMessageRepository";
import { ContactMessage } from "../../domain/entities/ContactMessage";

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
    constructor(
        @Inject('IContactMessageRepository')
        private contactMessageRepository: IContactMessageRepository
    ) {}

    async execute(data: IRequest): Promise<ContactMessage> {
        return this.contactMessageRepository.create(data);
    }
}
