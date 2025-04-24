import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { User } from '../../../generated/prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...user,
        id: user.id
      }
    });
  }

  public async notExistsById(id: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { id },
    });
    return count == 0;
  }

  public async findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
