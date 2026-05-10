import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComexSystemsConfigsTable1778380000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'comex_systems_configs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'header_badge',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'header_title_dark',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'header_title_highlight',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'header_description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_text',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'button_text',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'button_link',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'card_title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'card_topics',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'diffs_section_title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'diffs_section_subtitle',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'differentials',
                        type: 'jsonb',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comex_systems_configs');
    }

}
