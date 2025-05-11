import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy} from 'src/Auth/jwt.strategy';
import { RolesGuard } from 'src/Auth/guard/role.guard';
import * as dotenv from 'dotenv'
// import { BlockGuard } from 'src/Auth/guard/block.guard';
dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global:true,
    secret:process.env.JWTSECRET,
    signOptions:{expiresIn:'1h'}

  }),
  PassportModule.register({
    defaultStrategy:'jwt',
    session:true
  })
  
],
  controllers: [UserController],
  providers: [UserService,JwtStrategy,RolesGuard,],
  exports:[UserService,PassportModule,JwtStrategy,TypeOrmModule]
})
export class UserModule {}
