import { SetMetadata } from '@nestjs/common';
import { Roles as Role } from '../DTO/Role.enum';
export const ROLE_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
