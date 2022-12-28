import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

export const ActiveUser = createParamDecorator(
  // (field: string | undefined, ctx: ExecutionContext) => {

  // With interface, 2 lines are edited as (remove ActiveUserData from user):
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData = request['user'];
    return field ? user?.[field] : user;
  },
);
