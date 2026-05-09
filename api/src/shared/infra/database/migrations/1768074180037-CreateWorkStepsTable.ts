import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWorkStepsTable1768074180037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'work_steps_configs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()'
                    },
                    {
                        name: 'header_badge',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'header_title',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'header_description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'cta_text',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'steps',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('work_steps_configs');
    }
}
