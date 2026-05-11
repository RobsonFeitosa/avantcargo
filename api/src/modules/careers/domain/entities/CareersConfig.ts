import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('careers_configs')
export class CareersConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    subtitle: string;

    @Column({ type: 'text', nullable: true })
    description1: string;

    @Column({ type: 'text', nullable: true })
    description2: string;

    @Column({ type: 'text', nullable: true })
    description3: string;

    @Column({ type: 'text', nullable: true })
    description4: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    formTitle: string;

    @Column({ type: 'text', nullable: true })
    formSubtitle: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(partial: Partial<CareersConfig>) {
        Object.assign(this, partial);
    }
}
