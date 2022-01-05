import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './Controllers/auth.controller';
import { UserController } from './Controllers/user.controller';
import { JwtGuard } from './Guards/auth.guard';
import { JwtStrategy } from './Guards/auth.strategy';
import { RoleGuard } from './Guards/role.guard';
import { AuthService } from './Providers/auth.service';
import { UserService } from './Providers/user.service';
import { UserRepository } from './Repositories/user.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'thisismysecret',
        signOptions: {
          expiresIn: '3600s',
        },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController, AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy, RoleGuard, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
