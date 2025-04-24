import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Answer } from 'generated/prisma';

export type AnswerInput = Omit<Answer, 'id' | 'createdAt' | 'updatedAt'>;

interface IAnswerRepository {
    create(user: AnswerInput): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    update(id: number, user: AnswerInput): Promise<Answer>;
    remove(id: number): Promise<Answer>;
}

@Injectable()
export class AnswersRepository implements IAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(answer: AnswerInput) {
    return this.prisma.answer.create({
      data: answer,
    });
  }

  async findAll() {
    return this.prisma.answer.findMany();
  }

  async findOne(id: number) {
    return this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async update(id: number, answer: AnswerInput) {
    return this.prisma.answer.update({
      where: { id },
      data: answer,
    });
  }

  async remove(id: number) {
    return this.prisma.answer.delete({
      where: { id },
    });
  }

  async findAllByPostId(postId: number) {
    return this.prisma.answer.findMany({
      where: { postId },
    });
  }
}
