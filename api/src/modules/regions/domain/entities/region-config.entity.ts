import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('regions_configs')
export class RegionConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', nullable: true })
    title: string;

    @Column({ name: 'description', nullable: true, type: 'text' })
    description: string;

    @Column({ name: 'map_image_url', nullable: true })
    mapImageUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<RegionConfig>) {
        Object.assign(this, props);
    }
}
