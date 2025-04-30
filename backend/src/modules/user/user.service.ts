import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ClerkPayloadDto } from './dto/clerk-payload.dto';
import { clerkClient } from '@clerk/express';

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

  public async fetchUserData(clerkId: string) {
    return await clerkClient.users.getUser(clerkId);
  }
}
