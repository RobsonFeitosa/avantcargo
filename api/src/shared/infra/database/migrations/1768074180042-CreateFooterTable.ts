import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFooterTable1768074180042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'footer_configs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()'
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'social_links',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'contact_info',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'footer_links',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'copyright_text',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'terms_link',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'privacy_link',
                        type: 'varchar',
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
        await queryRunner.dropTable('footer_configs');
    }
}
