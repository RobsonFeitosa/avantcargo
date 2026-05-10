import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFoundersCTAToAboutUs1778360000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('about_us_configs', [
            new TableColumn({
                name: 'founders_badge',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founders_title',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founders_title_highlight',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder1_cargo',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder1_name',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder1_subtitle',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder1_bio',
                type: 'text',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder1_button_text',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder1_button_link',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder2_cargo',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder2_name',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder2_subtitle',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder2_bio',
                type: 'text',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder2_button_text',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder2_button_link',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'cta_title_dark',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'cta_title_highlight',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'cta_description',
                type: 'text',
                isNullable: true
            }),
            new TableColumn({
                name: 'cta_primary_button_text',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'cta_primary_button_link',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'cta_secondary_button_text',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'cta_secondary_button_link',
                type: 'varchar',
                isNullable: true
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('about_us_configs', [
            'founders_badge',
            'founders_title',
            'founders_title_highlight',
            'founder1_cargo',
            'founder1_name',
            'founder1_subtitle',
            'founder1_bio',
            'founder1_button_text',
            'founder1_button_link',
            'founder2_cargo',
            'founder2_name',
            'founder2_subtitle',
            'founder2_bio',
            'founder2_button_text',
            'founder2_button_link',
            'cta_title_dark',
            'cta_title_highlight',
            'cta_description',
            'cta_primary_button_text',
            'cta_primary_button_link',
            'cta_secondary_button_text',
            'cta_secondary_button_link'
        ]);
    }

}
