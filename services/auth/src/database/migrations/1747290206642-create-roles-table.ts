import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateRolesTable1747290206642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'roles',
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
      'roles',
      new TableIndex({ name: 'IDX_roles_name', columnNames: ['name'] }),
    );

    await queryRunner.createIndex(
      'roles',
      new TableIndex({ name: 'IDX_roles_code', columnNames: ['code'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('roles', 'IDX_roles_name');
    await queryRunner.dropIndex('roles', 'IDX_roles_code');

    await queryRunner.dropTable('roles');
  }
}
