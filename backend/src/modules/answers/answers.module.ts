import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { AnswersRepository } from './answers.repository';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PrismaModule, PostsModule],
  controllers: [AnswersController],
  providers: [AnswersService, AnswersRepository],
})
export class AnswersModule {}
