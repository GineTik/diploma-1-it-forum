import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Answer, Post, Tag } from '../../../generated/prisma';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostWithAuthorIdDto } from './dto/create-post.dto';

type GetPost = Post & { answers: Answer[], tags: Tag[] };

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async findAll(isArticle?: boolean): Promise<Post[]> {
    return this.prisma.post.findMany({ where: { isArticle } });
  }

  public async findAllWithIncludedRelations(isArticle?: boolean): Promise<GetPost[]> {
    return this.prisma.post.findMany({ where: { isArticle }, include: { answers: true, tags: true } });
  }

  public async findOne(id: number): Promise<Post> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  public async create(post: CreatePostWithAuthorIdDto): Promise<Post> {
    console.log(post);
    return this.prisma.post.create({ data: {
        ...post, 
        tags: { 
          connect: post.tags.map(tag => ({ id: tag }))
        }
    }});
  }

  public async update(id: number, post: Partial<UpdatePostDto>): Promise<Post> {
    if (!(await this.exists(id))) {
      throw new NotFoundException('Post not found');
    }
    return this.prisma.post.update({
      where: { id },
      data: {
        ...post,
        tags: {
          connect: post.tags.map(tag => ({ id: tag }))
        }
      },
    });
  }

  public async remove(id: number): Promise<Post> {
    if (!(await this.exists(id))) {
      throw new NotFoundException('Post not found');
    }
    return this.prisma.post.delete({ where: { id } });
  }

  public async exists(id: number): Promise<boolean> {
    const post = await this.findOne(id);
    return !!post;
  }

  public async findAllByAuthorId(authorId: string): Promise<Post[]> {
    return this.prisma.post.findMany({ where: { authorId } });
  }
}
