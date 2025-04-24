import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CLERK_DATA_KEY } from 'src/common/configs/auth.config';

export const ClerkId = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  
  if (!request[CLERK_DATA_KEY]) throw new Error('Clerk data not found in request');

  request[CLERK_DATA_KEY].clerkId = request[CLERK_DATA_KEY].sub;
  return request[CLERK_DATA_KEY];
});