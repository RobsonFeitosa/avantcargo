import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface ComexDifferential {
    id: string;
    icon: string;
    text: string;
}

export interface ComexSection {
    id: string;
    icon: string;
    title: string;
    desc: string;
    topics: string;
    image?: string;
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

    @Column({ type: 'jsonb', name: 'sections', nullable: true })
    sections: ComexSection[];

    @Column({ name: 'hero_whatsapp_text', nullable: true })
    heroWhatsappText: string;

    @Column({ name: 'hero_whatsapp_number', nullable: true })
    heroWhatsappNumber: string;

    @Column({ name: 'hero_message_text', nullable: true })
    heroMessageText: string;

    @Column({ name: 'hero_message_link', nullable: true })
    heroMessageLink: string;

    @Column({ name: 'footer_cta_title_dark', nullable: true })
    footerCtaTitleDark: string;

    @Column({ name: 'footer_cta_title_highlight', nullable: true })
    footerCtaTitleHighlight: string;

    @Column({ name: 'footer_cta_description', nullable: true })
    footerCtaDescription: string;

    @Column({ name: 'footer_whatsapp_text', nullable: true })
    footerWhatsappText: string;

    @Column({ name: 'footer_whatsapp_number', nullable: true })
    footerWhatsappNumber: string;

    @Column({ name: 'footer_message_text', nullable: true })
    footerMessageText: string;

    @Column({ name: 'footer_message_link', nullable: true })
    footerMessageLink: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(props: Partial<ComexSystemsConfig>) {
        Object.assign(this, props);
    }
}
