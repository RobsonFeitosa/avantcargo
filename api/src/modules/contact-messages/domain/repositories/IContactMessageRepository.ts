import { ContactMessage } from "../entities/ContactMessage";

export interface IContactMessageRepository {
    create(data: Partial<ContactMessage>): Promise<ContactMessage>;
    findAll(): Promise<ContactMessage[]>;
    findById(id: string): Promise<ContactMessage | null>;
    delete(id: string): Promise<void>;
}
