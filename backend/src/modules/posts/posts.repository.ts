import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Answer, Post, Tag } from '../../../generated/prisma';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostWithAuthorIdDto } from './dto/create-post.dto';
import { FilterPostParameters } from './dto/filter-post-parametrs.dto';
import { PostWithTagsAndAnswers } from './dto/post-with-tags-and-answers';
import { PostWithTags } from './dto/post-with-tags';

type GetPost = Post & { answers: Answer[], tags: Tag[] };

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async search(search: string): Promise<Post[]> {
    return this.prisma.post.findMany({ where: {
      title: { contains: search, mode: 'insensitive' }
    } });
  }

  public async findAll(filter: FilterPostParameters): Promise<Post[]> {
    return this.prisma.post.findMany({ where: {
      isArticle: filter.isArticle,
      authorId: filter.userId
    } });
  }

  public async findAllWithTags(filter: FilterPostParameters): Promise<PostWithTags[]> {
    return this.prisma.post.findMany({ 
      where: {
        isArticle: filter.isArticle,
        authorId: filter.userId
      },
      include: {
        tags: true
      }
    });
  }

  public async findAllWithIncludedRelations(filter: FilterPostParameters): Promise<PostWithTagsAndAnswers[]> {
    return this.prisma.post.findMany({ 
      where: {
        isArticle: filter.isArticle,
        authorId: filter.userId
      },
      include: {
        answers: true,
        tags: true
      }
    });
  }

  public async findOneWithTags(id: number): Promise<Post> {
    return this.prisma.post.findUnique({ where: { id }, include: { tags: true } });
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
    const post = await this.findOneWithTags(id);
    return !!post;
  }

  public async findAllByAuthorId(authorId: string): Promise<Post[]> {
    return this.prisma.post.findMany({ where: { authorId } });
  }
}
