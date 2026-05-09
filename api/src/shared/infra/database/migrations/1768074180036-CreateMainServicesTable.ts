import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMainServicesTable1768074180036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'main_services_configs',
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
                        name: 'services',
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
        await queryRunner.dropTable('main_services_configs');
    }
}
