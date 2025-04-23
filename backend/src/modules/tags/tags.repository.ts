import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from 'generated/prisma';

@Injectable()
export class TagsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async exists(id: number): Promise<boolean> {
    return await this.prismaService.tag.count({
      where: { id },
    }) > 0;
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.prismaService.tag.create({
      data: {
        name: createTagDto.name,
      },
    });
  }

  async findAll(): Promise<Tag[]> {
    return await this.prismaService.tag.findMany();
  }

  async findByPostId(postId: number): Promise<Tag[]> {
    return await this.prismaService.tag.findMany({
      where: { posts: { some: { id: postId } } },
    });
  }

  async findOne(id: number): Promise<Tag | null> {
    return await this.prismaService.tag.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Tag | null> {
    return await this.prismaService.tag.findUnique({
      where: { name },
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    return await this.prismaService.tag.update({
      where: { id },
      data: {
        ...(updateTagDto.name && { name: updateTagDto.name }),
      },
    });
  }

  async remove(id: number): Promise<Tag> {
    return await this.prismaService.tag.delete({
      where: { id },
    });
  }
}
