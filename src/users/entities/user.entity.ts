import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionType } from '../../iam/authorization/permission.type';
import { ApiKey } from '../api-keys/entities/api-key.entity';

export enum Role {
  Regular = 'regular',
  Admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  // Having both permissions and roles does not make sense in a real world but
  // we're using it just to showcase different authorization techniques:
  @Column({ enum: Permissions, default: [], type: 'json' })
  permissions: PermissionType[];

  @JoinTable()
  @OneToMany(() => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];
}
