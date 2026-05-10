import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddHistoryValuesDifferentialsToAboutUs1778350000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('about_us_configs', [
            new TableColumn({
                name: 'history_hero_title_dark',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'history_hero_title_orange',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'history_hero_description',
                type: 'text',
                isNullable: true
            }),
            new TableColumn({
                name: 'history_title',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'history_text',
                type: 'text',
                isNullable: true
            }),
            new TableColumn({
                name: 'history_timeline',
                type: 'jsonb',
                isNullable: true
            }),
            new TableColumn({
                name: 'values_badge',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'values_title_1',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'values_title_highlight',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'values_list',
                type: 'jsonb',
                isNullable: true
            }),
            new TableColumn({
                name: 'differentials_badge',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'differentials_title_1',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'differentials_title_highlight',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'differentials_list',
                type: 'jsonb',
                isNullable: true
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('about_us_configs', [
            'history_hero_title_dark',
            'history_hero_title_orange',
            'history_hero_description',
            'history_title',
            'history_text',
            'history_timeline',
            'values_badge',
            'values_title_1',
            'values_title_highlight',
            'values_list',
            'differentials_badge',
            'differentials_title_1',
            'differentials_title_highlight',
            'differentials_list'
        ]);
    }

}
