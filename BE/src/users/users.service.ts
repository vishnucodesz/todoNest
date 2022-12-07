import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(createUserDto.Password, 12);
    const user = await this.userRepo.create({
      userName: createUserDto.Username,
      password: hashedPassword,
    });

    return await this.userRepo.save(user);
  }

  async findById(userId: number) {
    return this.userRepo.find({where: {id: userId}});
  }

  async findbyUsername(userName : string){
    return await this.userRepo.findOne({where:{userName: userName}});
  }

  findAll() {
    return `This action returns all users`;
  }

  async getUsersWithNotes(itemId: number) {
    return await this.userRepo.findOne({
      where: { id: itemId },
      relations: ['notes'],
    });
  }

  findOne(itemId: number) {
    // this.userRepo.findOne()
    return this.userRepo.findOne({ where: { id: itemId } });
  }

  async userByUserName(userName: any) {
    return await this.userRepo.findOne({ where: { userName : userName } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(userid: number) {
    return await this.userRepo.delete({ id: userid });
  }
}
