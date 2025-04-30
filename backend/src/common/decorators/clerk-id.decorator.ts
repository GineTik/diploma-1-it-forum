import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CLERK_PAYLOAD_KEY } from 'src/common/configs/auth.config';

export const ClerkId = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  
  if (!request[CLERK_PAYLOAD_KEY]) throw new Error('Clerk data not found in request');

  request[CLERK_PAYLOAD_KEY].clerkId = request[CLERK_PAYLOAD_KEY].sub;
  return request[CLERK_PAYLOAD_KEY];
});