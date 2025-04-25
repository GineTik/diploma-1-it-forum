import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';
import { plainToInstance } from 'class-transformer';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('users/:id')
  async findOne(@Param('id') id: string) : Promise<GetUserDto> {
    const user = await this.usersService.fetchUserData(id);
    return plainToInstance(GetUserDto, user);
  }
}
