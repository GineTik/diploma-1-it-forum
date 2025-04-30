import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CLERK_PAYLOAD_KEY } from '../configs/auth.config';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const payload = req[CLERK_PAYLOAD_KEY];

    return payload ? true : false;
  }
}
