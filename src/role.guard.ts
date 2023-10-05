import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.body.user;

    console.log(user.roles);

    return matchRoles(roles, user.roles);
  }
}
function matchRoles(roles: string[], roles1: any): boolean {
  return !!roles.filter((element) => roles1.includes(element)).length;
}
