import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCareersTables1778400000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'careers_configs',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                    { name: 'title', type: 'varchar', isNullable: true },
                    { name: 'subtitle', type: 'text', isNullable: true },
                    { name: 'description1', type: 'text', isNullable: true },
                    { name: 'description2', type: 'text', isNullable: true },
                    { name: 'description3', type: 'text', isNullable: true },
                    { name: 'description4', type: 'text', isNullable: true },
                    { name: 'image', type: 'varchar', isNullable: true },
                    { name: 'formTitle', type: 'varchar', isNullable: true },
                    { name: 'formSubtitle', type: 'text', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' }
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'job_applications',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                    { name: 'name', type: 'varchar' },
                    { name: 'email', type: 'varchar' },
                    { name: 'phone', type: 'varchar' },
                    { name: 'message', type: 'text', isNullable: true },
                    { name: 'resumeFile', type: 'varchar', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('job_applications');
        await queryRunner.dropTable('careers_configs');
    }
}
