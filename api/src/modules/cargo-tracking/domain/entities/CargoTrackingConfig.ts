import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cargo_tracking_configs')
export class CargoTrackingConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', nullable: true })
    title: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(props: Partial<CargoTrackingConfig>) {
        Object.assign(this, props);
    }
}
