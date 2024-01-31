import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  findAll(@Req() req) {
    if (req?.user.refreshToken === '') {
      throw new UnauthorizedException('login to access routes');
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-access'))
  update(
    @Body() userUpdateDto: Prisma.UserUpdateInput,
    @Param('id') id: string,
    @Req() req,
  ) {
    if (+id !== req.user.id)
      throw new UnauthorizedException('Unauthorized Action');
    return this.usersService.update(req.user.id, userUpdateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access'))
  remove(@Param('id') id: string, @Req() req) {
    if (+id !== req.user.id)
      throw new UnauthorizedException('Unauthorized Action');
    return this.usersService.remove(req.user.id);
  }
}
