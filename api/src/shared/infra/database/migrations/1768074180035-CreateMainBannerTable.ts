import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMainBannerTable1768074180035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'main_banners',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()'
                    },
                    {
                        name: 'hero_badge',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'hero_title',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'hero_description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'hero_primary_button_text',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'hero_secondary_button_text',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'features',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'services_section_title',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'services',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'stats',
                        type: 'jsonb',
                        isNullable: true
                    },
                    {
                        name: 'footer_stats',
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
        await queryRunner.dropTable('main_banners');
    }
}
