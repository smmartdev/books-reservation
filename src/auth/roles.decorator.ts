import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/user.entity'; // Assuming you use Role enum

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
