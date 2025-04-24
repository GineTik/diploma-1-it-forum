import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from 'generated/prisma';
import { OpenRouterService } from 'src/common/ai/openrouter.service';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {

  constructor(
    private readonly openRouterService: OpenRouterService,
    private readonly postsRepository: PostsRepository,
  ) {

  }

  async createQuestion(createPostDto: CreatePostDto, id: string): Promise<Post> {
    return this.postsRepository.create({
      ...createPostDto,
      authorId: id,
      isArticle: false
    });
  }

  async createArticle(createPostDto: CreatePostDto, id: string): Promise<Post> {
    return this.postsRepository.create({
      ...createPostDto,
      authorId: id,
      isArticle: true
    });
  }

  async findAll(isArticle?: boolean): Promise<Post[]> {
    return this.postsRepository.findAll(isArticle);
  }

  async findOne(id: number): Promise<Post | undefined> {
    return this.postsRepository.findOne(id);
  }

  async findAllByAuthorId(authorId: string): Promise<Post[]> {
    return this.postsRepository.findAllByAuthorId(authorId);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | undefined> {
    return this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<Post | undefined> {
    return this.postsRepository.remove(id);
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