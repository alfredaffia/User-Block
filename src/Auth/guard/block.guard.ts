import { CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { BlockedException } from "../exception/block.exception";

export class BlockGuard implements CanActivate{
    async canActivate(context: ExecutionContext):Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const IsBlocked = request.user?.IsBlocked;

        if(IsBlocked===true) {
throw new BlockedException('Blocked')
        }
        return true;
        
    }
    
}