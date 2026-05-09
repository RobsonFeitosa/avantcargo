import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGeneralContactTable1768074180043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'general_contact_configs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()'
                    },
                    {
                        name: 'header_title_dark',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'header_title_highlight',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'header_description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'form_title',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'form_description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'whatsapp_number',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'whatsapp_subtitle',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'whatsapp_url',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'email_subtitle',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'instagram_user',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'instagram_subtitle',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'instagram_url',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'address',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'address_cnpj',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'address_maps_url',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'hours_mon_fri',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'hours_sat',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'hours_sun',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'faq_badge',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'faq_title',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'faqs',
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
        await queryRunner.dropTable('general_contact_configs');
    }
}
