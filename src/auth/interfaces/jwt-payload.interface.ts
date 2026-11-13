import { Role } from '../enums/role.enum';

export interface JwtPayload {
  sub: number;
  username: string;
  role: Role;
}

export interface ConnectedUser {
  id: number;
  username: string;
  role: Role;
}
