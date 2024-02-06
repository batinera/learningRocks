import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class TokensGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // recupera os tokens
    const tokens = this.reflector.getAllAndOverride<string[]>('tokens', [context.getHandler(), context.getClass()]);
    if (!tokens) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const userTokens = request.headers?.token?.split(',');
    return this.validateTokens(tokens, userTokens);
  }

  validateTokens(tokens: string[], userTokens: string[]) {
    return tokens.some(token => userTokens.includes(token));
  }
}