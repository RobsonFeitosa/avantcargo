import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAirRepresentationConfigTable1778348907163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'air_representation_configs',
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
                        name: 'import_sections',
                        type: 'jsonb',
                        isNullable: true,
                    },
                    {
                        name: 'export_sections',
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
        await queryRunner.dropTable('air_representation_configs');
    }

}
