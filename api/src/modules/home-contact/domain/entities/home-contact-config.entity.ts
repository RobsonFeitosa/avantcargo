import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('home_contact_configs')
export class HomeContactConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_badge', nullable: true })
    headerBadge: string;

    @Column({ name: 'header_title', nullable: true })
    headerTitle: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ name: 'cta_text', nullable: true })
    ctaText: string;

    @Column({ name: 'cta_subtext', nullable: true })
    ctaSubtext: string;

    @Column({ type: 'jsonb', nullable: true })
    features: { id: string; text: string }[];

    @Column({ type: 'jsonb', nullable: true })
    primaryButton: { text: string; link: string };

    @Column({ type: 'jsonb', nullable: true })
    secondaryButton: { text: string; link: string };

    @Column({ type: 'jsonb', nullable: true })
    textLink: { text: string; link: string };

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<HomeContactConfig>) {
        Object.assign(this, props);
    }
}
