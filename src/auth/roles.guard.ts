import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from '../user/user.entity'; // Assuming you use Role enum

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler()); // Extract roles metadata
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
 
    const path = request.url;
    console.log("paaath", path)
    // Bypass the guard for /auth paths
    // if (path.startsWith('/auth')) {
    //   return true;
    // }
 
    console.log(request.user)
    const user = request.user; // assuming user is attached via some middleware (like JWT Auth)
    console.log(user.role)

     if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }

  
}
