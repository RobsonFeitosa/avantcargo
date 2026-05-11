import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('job_applications')
export class JobApplication {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ nullable: true })
    resumeFile: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(partial: Partial<JobApplication>) {
        Object.assign(this, partial);
    }
}
