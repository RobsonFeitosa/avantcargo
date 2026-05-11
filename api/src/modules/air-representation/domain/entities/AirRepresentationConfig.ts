import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface AirRepresentationSection {
    id: string;
    icon: string;
    title: string;
    desc: string;
    topics: string;
    image?: string;
}

@Entity('air_representation_configs')
export class AirRepresentationConfig {
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

    @Column({ type: 'jsonb', name: 'import_sections', nullable: true })
    importSections: AirRepresentationSection[];

    @Column({ type: 'jsonb', name: 'export_sections', nullable: true })
    exportSections: AirRepresentationSection[];

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

    constructor(props: Partial<AirRepresentationConfig>) {
        Object.assign(this, props);
    }
}
