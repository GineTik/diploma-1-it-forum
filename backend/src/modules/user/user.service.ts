import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { ClerkPayloadDto } from './dto/clerk-payload.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createIfNotExists(user: ClerkPayloadDto) {
    if (await this.userRepository.notExistsById(user.clerkId)) {
      return this.userRepository.create({id: user.clerkId});
    }
  }

  public async findOneById(id: string) {
    return this.userRepository.findOneById(id);
  }
}
