import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { OWNERSHIP_KEY } from './ownership.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiresOwnership = this.reflector.getAllAndOverride<boolean>(OWNERSHIP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceOwnerId = request.params.id; // Adjust based on how you identify the resource owner

    console.log(user)

    if (requiredRoles) {
      if (!requiredRoles.some((role) => user.roles?.includes(role))) {
        throw new UnauthorizedException('You do not have the required roles.');
      }
    }

    if (requiresOwnership) {
      if (user.sub !== Number(resourceOwnerId)) {
        throw new UnauthorizedException('You are not the owner of this resource.');
      }
    }

    return true;
  }
}
