import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, OneToMany,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserRole, (ur) => ur.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions: RolePermission[];

  get permissions(): Permission[] {
    return this.rolePermissions?.map((rp) => rp.permission) || [];
  }
}
