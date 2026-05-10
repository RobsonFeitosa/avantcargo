import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface ComexDifferential {
    id: string;
    icon: string;
    text: string;
}

@Entity('comex_systems_configs')
export class ComexSystemsConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_badge', nullable: true })
    headerBadge: string;

    @Column({ name: 'header_title_dark', nullable: true })
    headerTitleDark: string;

    @Column({ name: 'header_title_highlight', nullable: true })
    headerTitleHighlight: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ name: 'highlight_title', nullable: true })
    highlightTitle: string;

    @Column({ name: 'highlight_text', nullable: true })
    highlightText: string;

    @Column({ name: 'button_text', nullable: true })
    buttonText: string;

    @Column({ name: 'button_link', nullable: true })
    buttonLink: string;

    @Column({ name: 'card_title', nullable: true })
    cardTitle: string;

    @Column({ name: 'card_topics', nullable: true })
    cardTopics: string;

    @Column({ name: 'diffs_section_title', nullable: true })
    diffsSectionTitle: string;

    @Column({ name: 'diffs_section_subtitle', nullable: true })
    diffsSectionSubtitle: string;

    @Column({ type: 'jsonb', name: 'differentials', nullable: true })
    differentials: ComexDifferential[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(props: Partial<ComexSystemsConfig>) {
        Object.assign(this, props);
    }
}
