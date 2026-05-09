import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('main_banners')
export class MainBanner {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hero_badge', nullable: true })
    heroBadge: string;

    @Column({ name: 'hero_title', nullable: true })
    heroTitle: string;

    @Column({ name: 'hero_description', nullable: true })
    heroDescription: string;

    @Column({ name: 'hero_primary_button_text', nullable: true })
    heroPrimaryButtonText: string;

    @Column({ name: 'hero_secondary_button_text', nullable: true })
    heroSecondaryButtonText: string;

    @Column({ type: 'jsonb', nullable: true })
    features: { id: string; text: string }[];

    @Column({ name: 'services_section_title', nullable: true })
    servicesSectionTitle: string;

    @Column({ type: 'jsonb', nullable: true })
    services: { id: string; title: string; desc: string }[];

    @Column({ type: 'jsonb', nullable: true })
    stats: { id: string; value: string; label: string }[];

    @Column({ type: 'jsonb', nullable: true })
    footer_stats: { id: string; value: string; label: string }[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<MainBanner>) {
        Object.assign(this, props);
    }
}
