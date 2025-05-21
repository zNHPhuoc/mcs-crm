import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateRolePermissionsTable1747290309712
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_permissions',
        columns: [
          {
            name: 'role_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'permission_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['permission_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'permissions',
            onDelete: 'CASCADE',
          }),
        ],
        indices: [
          new TableIndex({
            name: 'IDX_role_permissions_role_id_permission_id',
            columnNames: ['role_id', 'permission_id'],
            isUnique: true,
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role_permissions');
  }
}
