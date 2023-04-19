import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(user: UserRegisterDto) {
    const newUser = User.create({ ...user });
    const userExists = await this.findUserByUserName(user.username);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return User.find();
  }

  async findOne(id: number): Promise<User> {
    return User.findOne({ where: { id } });
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      throw new Error('User not found');
    }
    Object.assign(existingUser, user);
    return existingUser.save();
  }

  async delete(id: number): Promise<void> {
    await User.delete(id);
  }

  async findUserByUserName(username: string) {
    return User.findOne({
      where: { username },
    });
  }

  findById(id: number) {
    return User.findOne({ where: { id } });
  }
}
