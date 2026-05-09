import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('main_services_configs')
export class MainServiceConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_badge', nullable: true })
    headerBadge: string;

    @Column({ name: 'header_title', nullable: true })
    headerTitle: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ type: 'jsonb', nullable: true })
    services: { id: string; badge?: string; title: string; desc: string }[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<MainServiceConfig>) {
        Object.assign(this, props);
    }
}
