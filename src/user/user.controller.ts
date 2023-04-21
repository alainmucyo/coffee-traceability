import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller({ version: '1', path: 'users' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiConsumes('application/json')
  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  async login(@Body() { username, password }) {
    if (!username || !password)
      throw new UnauthorizedException('Invalid username or password');
    const validateUser = await this.authService.validateUser(
      username,
      password,
    );
    if (!validateUser)
      throw new UnauthorizedException('Invalid username or password');
    return this.authService.login({ user: validateUser });
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered and logged in' })
  @ApiBody({ type: UserRegisterDto })
  @Post('/register')
  async create(@Body() userRegisterDto: UserRegisterDto) {
    const user = await this.userService.create(userRegisterDto);
    return await this.authService.login({ user });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'A list of all users' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The updated user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiBody({ type: UserRegisterDto })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() producer: Partial<UserRegisterDto>,
  ): Promise<User> {
    return this.userService.update(id, producer);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check the login status of a user' })
  @ApiResponse({ status: 200, description: 'Logged-in user information' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/check')
  @UseInterceptors(ClassSerializerInterceptor)
  checkLogin(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'The user with the specified ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
