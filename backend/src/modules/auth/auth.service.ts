import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validadeGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByGoogleId(googleUser.googleId);
    if (user) {
      return user;
    }
    return await this.userService.create(googleUser);
  }

  async login(userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      googleId: user.googleId,
    };

    return {
      user: {
        id: user.id,
        googleId: user.googleId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
