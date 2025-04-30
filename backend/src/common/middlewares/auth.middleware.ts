
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CLERK_PAYLOAD_KEY } from '../configs/auth.config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractToken(req);

    if (!token) {
      return next();
    }

    try {
      const payload = jwt.decode(token);
      req[CLERK_PAYLOAD_KEY] = payload;
      next();
    } catch (err) {
      next();
    }
  }

  private extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const [, token] = authHeader.split(' ');
    return token;
  }
}
