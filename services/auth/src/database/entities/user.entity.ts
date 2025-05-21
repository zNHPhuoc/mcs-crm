import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Gender, UserStatus } from '../../common/enums/user.enum';
import { RefreshToken } from './refresh-token.entity';
import { UserRole } from './user-role.entity';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ nullable: true })
  nickname: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  dob: string;

  @Column({ name: 'verify_mail', default: false })
  verifyMail: boolean;

  @Column({ name: 'verify_phone', default: false })
  verifyPhone: boolean;

  @Column({ name: 'phone_number', length: 15, nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => RefreshToken, (token) => token.user, {
    cascade: true,
  })
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles: UserRole[];

  get roles(): Role[] {
    return this.userRoles?.map((ur) => ur.role) || [];
  }

  get permissions(): Permission[] {
    return (
      this.roles
        ?.flatMap((role) => role.rolePermissions || [])
        .map((rp) => rp.permission) || []
    );
  }
}
