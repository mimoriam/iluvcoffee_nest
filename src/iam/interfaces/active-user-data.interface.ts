import { Role } from '../../users/entities/user.entity';
import { PermissionType } from '../authorization/permission.type';

export interface ActiveUserData {
  // The subject of the token or userId:
  sub: number;

  email: string;

  role: Role;

  permissions: PermissionType[];
}
