import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAboutUsTable1768074180038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'about_us_configs',
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
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'header_description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'primary_button_text',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'secondary_button_text',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'differentials',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'achievements',
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
        await queryRunner.dropTable('about_us_configs');
    }
}
