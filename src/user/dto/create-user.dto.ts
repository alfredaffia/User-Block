import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, } from 'class-validator';
import { UserRole } from '../enum/user.role.enum';
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 0, minLowercase: 1 })
    password: string;
  
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    role: UserRole;

}
