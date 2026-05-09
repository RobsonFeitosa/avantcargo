import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('sectors_configs')
export class SectorConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_badge', nullable: true })
    headerBadge: string;

    @Column({ name: 'header_title', nullable: true })
    headerTitle: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ type: 'jsonb', nullable: true })
    sectors: { id: string; title: string; desc: string; iconName: string }[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<SectorConfig>) {
        Object.assign(this, props);
    }
}
