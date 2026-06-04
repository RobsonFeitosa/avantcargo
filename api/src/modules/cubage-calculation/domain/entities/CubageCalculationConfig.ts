import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cubage_calculation_configs')
export class CubageCalculationConfig {
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

    constructor(props: Partial<CubageCalculationConfig>) {
        Object.assign(this, props);
    }
}
