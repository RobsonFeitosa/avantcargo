import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface TransportDifferential {
    id: string;
    icon: string;
    text: string;
}

@Entity('transport_configs')
export class TransportConfig {
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

    @Column({ name: 'highlight_image', nullable: true })
    highlightImage: string;

    @Column({ name: 'highlight_title', nullable: true })
    highlightTitle: string;

    @Column({ name: 'highlight_text1', nullable: true })
    highlightText1: string;

    @Column({ name: 'highlight_quote', nullable: true })
    highlightQuote: string;

    @Column({ name: 'highlight_text2', nullable: true })
    highlightText2: string;

    @Column({ name: 'button_text', nullable: true })
    buttonText: string;

    @Column({ name: 'button_link', nullable: true })
    buttonLink: string;

    @Column({ name: 'diffs_section_title', nullable: true })
    diffsSectionTitle: string;

    @Column({ name: 'diffs_section_highlight', nullable: true })
    diffsSectionHighlight: string;

    @Column({ name: 'diffs_section_description', nullable: true })
    diffsSectionDescription: string;

    @Column({ type: 'jsonb', name: 'differentials', nullable: true })
    differentials: TransportDifferential[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(props: Partial<TransportConfig>) {
        Object.assign(this, props);
    }
}
