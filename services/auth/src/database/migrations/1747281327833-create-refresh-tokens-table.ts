import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRefreshTokensTable1747281327833
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Đảm bảo extension uuid-ossp tồn tại
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Tạo bảng refresh_tokens
    await queryRunner.createTable(
      new Table({
        name: 'refresh_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'token', type: 'text', isNullable: false },
          { name: 'expires_at', type: 'timestamp', isNullable: false },
          { name: 'revoked', type: 'boolean', default: 'false' },
          { name: 'ip', type: 'varchar', length: '255', isNullable: true },
          {
            name: 'user_agent',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    // Thêm foreign key tới users.id
    await queryRunner.createForeignKey(
      'refresh_tokens',
      new TableForeignKey({
        name: 'FK_refresh_tokens_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('refresh_tokens');
    const fk = table?.foreignKeys.find(
      (fk) => fk.name === 'FK_refresh_tokens_user',
    );
    if (fk) {
      await queryRunner.dropForeignKey('refresh_tokens', fk);
    }

    await queryRunner.dropTable('refresh_tokens');
  }
}
