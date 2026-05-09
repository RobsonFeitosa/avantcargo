import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactMessage } from "../../../domain/entities/ContactMessage";
import { IContactMessageRepository } from "../../../domain/repositories/IContactMessageRepository";

@Injectable()
export class ContactMessageRepository implements IContactMessageRepository {
    constructor(
        @InjectRepository(ContactMessage)
        private repository: Repository<ContactMessage>
    ) {}

    async create(data: Partial<ContactMessage>): Promise<ContactMessage> {
        const message = this.repository.create(data);
        return this.repository.save(message);
    }

    async findAll(): Promise<ContactMessage[]> {
        return this.repository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: string): Promise<ContactMessage | null> {
        return this.repository.findOne({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
