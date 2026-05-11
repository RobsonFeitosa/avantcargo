import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const ctaColumns: TableColumn[] = [
    new TableColumn({ name: 'hero_whatsapp_text', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'hero_whatsapp_number', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'hero_message_text', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'hero_message_link', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'footer_cta_title_dark', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'footer_cta_title_highlight', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'footer_cta_description', type: 'text', isNullable: true }),
    new TableColumn({ name: 'footer_whatsapp_text', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'footer_whatsapp_number', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'footer_message_text', type: 'varchar', isNullable: true }),
    new TableColumn({ name: 'footer_message_link', type: 'varchar', isNullable: true }),
];

export class AddCtaColumnsToServiceConfigs1778400000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('air_representation_configs', ctaColumns);
        await queryRunner.addColumns('comex_systems_configs', ctaColumns);
        await queryRunner.addColumns('transport_configs', ctaColumns);

        await queryRunner.addColumn('comex_systems_configs',
            new TableColumn({ name: 'sections', type: 'jsonb', isNullable: true })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = ctaColumns.map(c => c.name);
        for (const name of names) {
            await queryRunner.dropColumn('air_representation_configs', name);
            await queryRunner.dropColumn('comex_systems_configs', name);
            await queryRunner.dropColumn('transport_configs', name);
        }
        await queryRunner.dropColumn('comex_systems_configs', 'sections');
    }

}
