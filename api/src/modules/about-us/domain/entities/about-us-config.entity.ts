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
    differentials: { id: string; title: string; desc: string }[];

    @Column({ type: 'jsonb', nullable: true })
    achievements: { id: string; title: string; desc: string }[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<AboutUsConfig>) {
        Object.assign(this, props);
    }
}
