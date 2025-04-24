import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerInput, AnswersRepository } from './answers.repository';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly postsService: PostsService,
  ) {}

  create(dto: CreateAnswerDto, userId: string) {
    return this.answersRepository.create({
      ...dto,
      authorId: userId,
    } as AnswerInput);
  }

  findAll() {
    return this.answersRepository.findAll();
  }

  findOne(id: number) {
    return this.answersRepository.findOne(id);
  }

  update(id: number, userId: string, dto: UpdateAnswerDto) {
    return this.answersRepository.update(id, {
      ...dto,
      authorId: userId,
    } as AnswerInput);
  }

  remove(id: number) {
    return this.answersRepository.remove(id);
  }

  async markAsCorrect(id: number, userId: string) {
    const answer = await this.answersRepository.findOne(id);
    const post = await this.postsService.findOne(answer.postId);

    if (userId !== post.authorId) {
      throw new ForbiddenException('You are not allowed to mark this answer as correct');
    }

    return this.answersRepository.update(id, {
      isCorrect: true,
    } as AnswerInput);
  }

  findAllByPostId(postId: number) {
    return this.answersRepository.findAllByPostId(postId);
  }
}
