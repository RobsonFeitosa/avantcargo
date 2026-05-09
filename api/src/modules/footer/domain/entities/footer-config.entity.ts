import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('footer_configs')
export class FooterConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'jsonb', nullable: true })
    social_links: { icon: string; link: string }[];

    @Column({ type: 'jsonb', nullable: true })
    contact_info: { address: string; phone: string; email: string };

    @Column({ type: 'jsonb', nullable: true })
    footer_links: { title: string; links: { name: string; path: string }[] }[];

    @Column({ name: 'copyright_text', nullable: true })
    copyrightText: string;

    @Column({ name: 'terms_link', nullable: true })
    termsLink: string;

    @Column({ name: 'privacy_link', nullable: true })
    privacyLink: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<FooterConfig>) {
        Object.assign(this, props);
    }
}
