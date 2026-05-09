import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contact_messages')
export class ContactMessage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    company: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    service: string;

    @Column('text')
    message: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(props: Partial<ContactMessage>) {
        Object.assign(this, props);
    }
}
