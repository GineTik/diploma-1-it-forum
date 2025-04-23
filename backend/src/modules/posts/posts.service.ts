import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from 'generated/prisma';
import { OpenRouterService } from 'src/common/ai/openrouter.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PostsService {
  private entities: Post[] = [];

  constructor(
    private readonly openRouterService: OpenRouterService,
    private readonly prisma: PrismaService
  ) {

  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    throw new NotImplementedException();
  }

  async findAll(isArticle?: boolean): Promise<Post[]> {
    throw new NotImplementedException();
  }

  async findOne(id: number): Promise<Post | undefined> {
    throw new NotImplementedException();
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | undefined> {
    throw new NotImplementedException();
  }

  async remove(id: number): Promise<Post | undefined> {
    throw new NotImplementedException();
  }

  async makeExcerptFromContent(postId: number): Promise<string> {
    const post = await this.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    
    const prompt = `
      Make a short excerpt from the content of the post with title "${post.title}" and content "${post.content}".

      The excerpt should be a short summary of the post.

      The excerpt should be in Ukrainian. Write the result in Ukrainian language, even if the instruction is in English.

      The excerpt should be no longer than 100 words.
    `;

    return await this.openRouterService.writeToAI(prompt);
  }
}