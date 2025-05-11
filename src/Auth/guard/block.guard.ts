// import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserService } from '../../user/user.service';
// @Injectable()
// export class BlockGuard implements CanActivate {
//   constructor(private readonly userService: UserService, private readonly reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const userId = request.user?.id; // Assuming `user` is attached to the request (e.g., via a JWT)

//     const user = await this.userService.findOne(userId);

//     if (user.IsBlocked) {
//       throw new ForbiddenException('Access denied. Your account is blocked.');
//     }

//     return true; // Allow access if the user is not blocked
//   }
// }