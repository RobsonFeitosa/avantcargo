import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('work_steps_configs')
export class WorkStepConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'header_badge', nullable: true })
    headerBadge: string;

    @Column({ name: 'header_title', nullable: true })
    headerTitle: string;

    @Column({ name: 'header_description', nullable: true })
    headerDescription: string;

    @Column({ name: 'cta_text', nullable: true })
    ctaText: string;

    @Column({ type: 'jsonb', nullable: true })
    steps: { id: string; title: string; desc: string }[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<WorkStepConfig>) {
        Object.assign(this, props);
    }
}
