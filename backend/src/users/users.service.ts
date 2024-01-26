import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const { password, ...others } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    return this.databaseService.user.create({
      data: {
        password: hashPassword,
        ...others,
      },
    });
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: Prisma.UserUpdateInput) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
