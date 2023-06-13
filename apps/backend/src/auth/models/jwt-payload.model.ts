import { Role } from '../../users/entities/role.enum';

export interface TokenPayload {
  sub: string;
  role: Role;
  iat?: number;
  exp?: number;
}
