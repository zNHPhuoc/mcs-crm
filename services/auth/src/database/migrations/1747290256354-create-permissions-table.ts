import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreatePermissionsTable1747290256354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar', length: '100' },
          { name: 'code', type: 'varchar', length: '100', isUnique: true },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'permissions',
      new TableIndex({ name: 'IDX_permissions_name', columnNames: ['name'] }),
    );

    await queryRunner.createIndex(
      'permissions',
      new TableIndex({ name: 'IDX_permissions_code', columnNames: ['code'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('permissions', 'IDX_permissions_name');
    await queryRunner.dropIndex('permissions', 'IDX_permissions_code');

    await queryRunner.dropTable('permissions');
  }
}
