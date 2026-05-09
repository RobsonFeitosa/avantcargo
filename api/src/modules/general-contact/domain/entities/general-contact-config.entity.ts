import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('general_contact_configs')
export class GeneralContactConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_title_dark', nullable: true })
    headerTitleDark: string;

    @Column({ name: 'header_title_highlight', nullable: true })
    headerTitleHighlight: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ name: 'form_title', nullable: true })
    formTitle: string;

    @Column({ name: 'form_description', nullable: true })
    formDescription: string;

    @Column({ name: 'whatsapp_number', nullable: true })
    whatsappNumber: string;

    @Column({ name: 'whatsapp_subtitle', nullable: true })
    whatsappSubtitle: string;

    @Column({ name: 'whatsapp_url', nullable: true })
    whatsappUrl: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'email_subtitle', nullable: true })
    emailSubtitle: string;

    @Column({ name: 'instagram_user', nullable: true })
    instagramUser: string;

    @Column({ name: 'instagram_subtitle', nullable: true })
    instagramSubtitle: string;

    @Column({ name: 'instagram_url', nullable: true })
    instagramUrl: string;

    @Column({ nullable: true })
    address: string;

    @Column({ name: 'address_cnpj', nullable: true })
    addressCnpj: string;

    @Column({ name: 'address_maps_url', nullable: true })
    addressMapsUrl: string;

    @Column({ name: 'hours_mon_fri', nullable: true })
    hoursMonFri: string;

    @Column({ name: 'hours_sat', nullable: true })
    hoursSat: string;

    @Column({ name: 'hours_sun', nullable: true })
    hoursSun: string;

    @Column({ name: 'faq_badge', nullable: true })
    faqBadge: string;

    @Column({ name: 'faq_title', nullable: true })
    faqTitle: string;

    @Column({ type: 'jsonb', nullable: true })
    faqs: { id: string; q: string; a: string }[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<GeneralContactConfig>) {
        Object.assign(this, props);
    }
}
