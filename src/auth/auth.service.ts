import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserService } from '../user/user.service';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUserByUserName(username);
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }
  async login({ user }: any) {
    const payload = { email: user.email, sub: user.id };
    delete user.password;
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
