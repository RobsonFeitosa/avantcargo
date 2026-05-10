import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransportConfigsTable1778390000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transport_configs',
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
                        name: 'highlight_image',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_text1',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_quote',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'highlight_text2',
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
                        name: 'diffs_section_title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'diffs_section_highlight',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'diffs_section_description',
                        type: 'text',
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
        await queryRunner.dropTable('transport_configs');
    }

}
