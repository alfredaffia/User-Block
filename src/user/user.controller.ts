import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './enum/user.role.enum';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { Roles } from 'src/Auth/guard/role';
import { RolesGuard } from 'src/Auth/guard/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Post('signin')
  signIn(@Body() LoginDto: LoginDto, @Res() res: Response) {
    return this.userService.signIn(LoginDto, res);
  }
  @Get()
   @UseGuards(AuthGuard(),
  )
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/promote')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPERADMIN) // Only allow admin to promote others
  async promoteToAdmin(@Param('id') id: string) {
    return this.userService.promoteToAdmin(id);
  }
  @Patch(':id/demote')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(UserRole.SUPERADMIN) // Only allow superadmin to demote others
  async DemoteAdmin(@Param('id') id: string) {
    return this.userService.DemoteAdmin(id);
  }

  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPERADMIN)
  @Patch(':id/block')
  async updateBlockStatus(
    @Param('id') id: string) {
    return this.userService.blockUser(id);
  }

  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPERADMIN) 
  @Patch(':id/unblock')
  async updateUnBlockStatus(
    @Param('id') id: string) {
    return this.userService.unBlockUser(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }


}
