import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFounderImagesToAboutUs1778370000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('about_us_configs', [
            new TableColumn({
                name: 'founder1_image',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'founder2_image',
                type: 'varchar',
                isNullable: true
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('about_us_configs', [
            'founder1_image',
            'founder2_image'
        ]);
    }

}
