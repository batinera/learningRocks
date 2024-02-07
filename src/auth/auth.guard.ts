import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // recupera as auths
    const auths = this.reflector.getAllAndOverride<string[]>('auths', [context.getHandler(), context.getClass()]);
    if (!auths) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const userAuths = request.headers?.auth?.split(',');
    return this.validateAuths(auths, userAuths);
  }

  validateAuths(auths: string[], userAuths: string[]) {
    return auths.some(auth => userAuths.includes(auth));
  }
}