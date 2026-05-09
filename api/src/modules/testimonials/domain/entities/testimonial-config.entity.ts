import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('testimonials_configs')
export class TestimonialConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_badge', nullable: true })
    headerBadge: string;

    @Column({ name: 'header_title', nullable: true })
    headerTitle: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ type: 'jsonb', nullable: true })
    testimonials: { id: string; name: string; role: string; content: string; imageUrl?: string }[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<TestimonialConfig>) {
        Object.assign(this, props);
    }
}
