import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateUserRolesTable1747290306379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_roles',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'role_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'CASCADE',
          }),
        ],
        indices: [
          new TableIndex({
            name: 'IDX_user_roles_user_id_role_id',
            columnNames: ['user_id', 'role_id'],
            isUnique: true,
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_roles');
  }
}
