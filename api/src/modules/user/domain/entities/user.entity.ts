import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<User>) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getName() { return this.name; }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}