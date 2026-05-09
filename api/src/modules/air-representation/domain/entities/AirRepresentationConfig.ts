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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(props: Partial<AirRepresentationConfig>) {
        Object.assign(this, props);
    }
}
