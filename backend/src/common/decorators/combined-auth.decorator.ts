import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../guards/clerk-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(
    UseGuards(ClerkAuthGuard),
    ApiBearerAuth('JWT-auth'),
    SetMetadata('auth', true),
  );
} 