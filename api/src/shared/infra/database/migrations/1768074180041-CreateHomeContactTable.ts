import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHomeContactTable1768074180041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'home_contact_configs',
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
                        name: 'cta_subtext',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'features',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'primary_button',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'secondary_button',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'text_link',
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
        await queryRunner.dropTable('home_contact_configs');
    }
}
