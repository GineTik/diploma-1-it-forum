import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import {
  CreatePostDto,
  CreatePostWithAuthorIdDto,
} from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from 'generated/prisma';
import { OpenRouterService } from 'src/common/ai/openrouter.service';
import { PostsRepository } from './posts.repository';
import { GetQuestionDto } from './dto/get-question.dto';
import { plainToInstance } from 'class-transformer';
import { FilterPostParameters } from './dto/filter-post-parametrs.dto';
import { GetArticleDto } from './dto/get-article.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly openRouterService: OpenRouterService,
    private readonly postsRepository: PostsRepository,
  ) {}

  async search(search: string): Promise<Post[]> {
    return this.postsRepository.search(search);
  }

  async createQuestion(
    createPostDto: CreatePostDto,
    id: string,
  ): Promise<Post> {
    return this.postsRepository.create({
      ...createPostDto,
      authorId: id,
      isArticle: false,
    });
  }

  async createArticle(createPostDto: CreatePostDto, id: string): Promise<Post> {
    return this.postsRepository.create({
      ...createPostDto,
      authorId: id,
      isArticle: true,
    });
  }

  async findAllArticles(
    filter: Omit<FilterPostParameters, 'isArticle'>,
  ): Promise<GetArticleDto[]> {
    return this.postsRepository.findAllWithIncludedRelations({
      ...filter,
      isArticle: true,
    });
  }

  async findAllQuestions(
    filter: Omit<FilterPostParameters, 'isArticle'>,
  ): Promise<GetQuestionDto[]> {
    const questions = await this.postsRepository.findAllWithIncludedRelations({
      ...filter,
      isArticle: false,
    });
    return plainToInstance(
      GetQuestionDto,
      questions.map((question) => ({
        ...question,
        answersCount: question.answers.length,
        haveCorrectAnswer: question.answers.some((answer) => answer.isCorrect),
        tags: question.tags,
      })),
    );
  }

  async findOne(id: number): Promise<Post | undefined> {
    return this.postsRepository.findOneWithTags(id);
  }

  async findAllByAuthorId(authorId: string): Promise<Post[]> {
    return this.postsRepository.findAllByAuthorId(authorId);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post | undefined> {
    return this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<void> {
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
