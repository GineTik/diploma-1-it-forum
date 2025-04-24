import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { CLERK_DATA_KEY } from 'src/common/configs/auth.config';
import { ClerkPayloadDto } from './dto/clerk-payload.dto';

@Injectable()
export class SyncClerkUserMiddleware implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const payload = request[CLERK_DATA_KEY] as  ClerkPayloadDto;
    if (!payload || typeof payload !== 'object' || !payload.clerkId) {
      return next.handle();
    }

    await this.userService.createIfNotExists(payload);

    console.log(await this.userService.findOneById(payload.clerkId));
    return next.handle();
  }
}