import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { CLERK_PAYLOAD_KEY } from 'src/common/configs/auth.config';
import { NextFunction } from 'express';

@Injectable()
export class SyncClerkUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const payload = req[CLERK_PAYLOAD_KEY];
    if (!payload || typeof payload !== 'object' || !payload['sub']) {
      return next();
    }

    await this.userService.createIfNotExists({clerkId: payload['sub']});
    next();
  }
}