import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddReadToContactMessages1778347528287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'contact_messages',
            new TableColumn({
                name: 'read',
                type: 'boolean',
                default: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('contact_messages', 'read');
    }

}
