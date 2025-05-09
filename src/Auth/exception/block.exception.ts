import { ForbiddenException } from "@nestjs/common";

export class BlockedException extends ForbiddenException{
    constructor(role:string){
        super(`Forbidden, you have been blocked`)
    }
}