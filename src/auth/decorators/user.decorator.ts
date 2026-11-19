import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { ConnectedUser } from '../interfaces/jwt-payload.interface';

export const User = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();
  return request.user as ConnectedUser;
});
