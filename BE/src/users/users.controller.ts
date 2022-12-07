import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { get } from 'http';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    
    ) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('getUsersWithNotes/:id')
  getUsersWithNotes(@Param('id') id: string) {
    return this.usersService.getUsersWithNotes(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('auth/login')
  async loginauth(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.findbyUsername(userName);

    if (!user) {
      throw new BadRequestException('Invalid Credentials !!');
    }
    if (!await bcrypt.compare(password, user.password )) {
      throw new BadRequestException('Invalid Credentials !!');
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
