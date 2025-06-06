import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { CLERK_PAYLOAD_KEY } from 'src/common/configs/auth.config';
import { NextFunction } from 'express';

@Injectable()
export class SyncClerkUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const payload = req[CLERK_PAYLOAD_KEY];

    if (!payload) {
      return next();
    }

    const clerkId = payload['sub'];

    if (!payload || typeof payload !== 'object' || !clerkId) {
      return next();
    }

    await this.userService.createIfNotExists({ clerkId });
    next();
  }
}