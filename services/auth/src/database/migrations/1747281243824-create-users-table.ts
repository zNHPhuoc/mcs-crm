import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsersTable1747281243824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TYPE "user_status_enum" AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');
      CREATE TYPE "user_gender_enum" AS ENUM ('MALE', 'FEMALE', 'OTHER');
    `);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          { name: 'avatar', type: 'text', isNullable: true },
          {
            name: 'full_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'user_status_enum',
            default: `'ACTIVE'`,
            isNullable: false,
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          { name: 'age', type: 'int', isNullable: true },
          { name: 'gender', type: 'user_gender_enum', isNullable: true },
          { name: 'dob', type: 'date', isNullable: true },
          { name: 'verify_mail', type: 'boolean', default: false },
          { name: 'verify_phone', type: 'boolean', default: false },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          { name: 'address', type: 'text', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({ name: 'IDX_users_username', columnNames: ['username'] }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({ name: 'IDX_users_email', columnNames: ['email'] }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_users_full_name',
        columnNames: ['full_name'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({ name: 'IDX_users_status', columnNames: ['status'] }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_users_phone_number',
        columnNames: ['phone_number'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_users_username');
    await queryRunner.dropIndex('users', 'IDX_users_email');
    await queryRunner.dropIndex('users', 'IDX_users_full_name');
    await queryRunner.dropIndex('users', 'IDX_users_status');
    await queryRunner.dropIndex('users', 'IDX_users_phone_number');

    await queryRunner.dropTable('users');

    await queryRunner.query(`DROP TYPE IF EXISTS "user_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_gender_enum"`);
  }
}
