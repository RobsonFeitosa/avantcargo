import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('about_us_configs')
export class AboutUsConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_badge', nullable: true })
    headerBadge: string;

    @Column({ name: 'header_title', nullable: true })
    headerTitle: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ name: 'primary_button_text', nullable: true })
    primaryButtonText: string;

    @Column({ name: 'secondary_button_text', nullable: true })
    secondaryButtonText: string;

    @Column({ type: 'jsonb', nullable: true })
    differentials: { id: string; icon: string; title: string; desc: string }[];

    @Column({ type: 'jsonb', nullable: true })
    achievements: { id: string; icon: string; title: string; desc: string }[];

    @Column({ name: 'history_hero_title_dark', nullable: true })
    historyHeroTitleDark: string;

    @Column({ name: 'history_hero_title_orange', nullable: true })
    historyHeroTitleOrange: string;

    @Column({ name: 'history_hero_description', nullable: true })
    historyHeroDescription: string;

    @Column({ name: 'history_title', nullable: true })
    historyTitle: string;

    @Column({ name: 'history_text', nullable: true })
    historyText: string;

    @Column({ type: 'jsonb', nullable: true })
    historyTimeline: { id: string; year: string; text: string }[];

    @Column({ name: 'values_badge', nullable: true })
    valuesBadge: string;

    @Column({ name: 'values_title_1', nullable: true })
    valuesTitle1: string;

    @Column({ name: 'values_title_highlight', nullable: true })
    valuesTitleHighlight: string;

    @Column({ type: 'jsonb', nullable: true })
    valuesList: { id: string; icon: string; title: string; desc: string }[];

    @Column({ name: 'differentials_badge', nullable: true })
    differentialsBadge: string;

    @Column({ name: 'differentials_title_1', nullable: true })
    differentialsTitle1: string;

    @Column({ name: 'differentials_title_highlight', nullable: true })
    differentialsTitleHighlight: string;

    @Column({ type: 'jsonb', nullable: true })
    differentialsList: { id: string; icon: string; title: string; desc: string }[];

    @Column({ name: 'founders_badge', nullable: true })
    foundersBadge: string;

    @Column({ name: 'founders_title', nullable: true })
    foundersTitle: string;

    @Column({ name: 'founders_title_highlight', nullable: true })
    foundersTitleHighlight: string;

    @Column({ name: 'founder1_cargo', nullable: true })
    founder1Cargo: string;

    @Column({ name: 'founder1_name', nullable: true })
    founder1Name: string;

    @Column({ name: 'founder1_subtitle', nullable: true })
    founder1Subtitle: string;

    @Column({ name: 'founder1_bio', nullable: true })
    founder1Bio: string;

    @Column({ name: 'founder1_button_text', nullable: true })
    founder1ButtonText: string;

    @Column({ name: 'founder1_button_link', nullable: true })
    founder1ButtonLink: string;

    @Column({ name: 'founder1_image', nullable: true })
    founder1Image: string;

    @Column({ name: 'founder2_cargo', nullable: true })
    founder2Cargo: string;

    @Column({ name: 'founder2_name', nullable: true })
    founder2Name: string;

    @Column({ name: 'founder2_subtitle', nullable: true })
    founder2Subtitle: string;

    @Column({ name: 'founder2_bio', nullable: true })
    founder2Bio: string;

    @Column({ name: 'founder2_button_text', nullable: true })
    founder2ButtonText: string;

    @Column({ name: 'founder2_button_link', nullable: true })
    founder2ButtonLink: string;

    @Column({ name: 'founder2_image', nullable: true })
    founder2Image: string;

    @Column({ name: 'cta_title_dark', nullable: true })
    ctaTitleDark: string;

    @Column({ name: 'cta_title_highlight', nullable: true })
    ctaTitleHighlight: string;

    @Column({ name: 'cta_description', nullable: true })
    ctaDescription: string;

    @Column({ name: 'cta_primary_button_text', nullable: true })
    ctaPrimaryButtonText: string;

    @Column({ name: 'cta_primary_button_link', nullable: true })
    ctaPrimaryButtonLink: string;

    @Column({ name: 'cta_secondary_button_text', nullable: true })
    ctaSecondaryButtonText: string;

    @Column({ name: 'cta_secondary_button_link', nullable: true })
    ctaSecondaryButtonLink: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<AboutUsConfig>) {
        Object.assign(this, props);
    }
}
