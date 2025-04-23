import { Module, forwardRef } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { AiModule } from 'src/common/ai/ai.module';
import { PostsModule } from '../posts/posts.module';
import { TagsRepository } from './tags.repository';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
  imports: [AiModule, PostsModule, PrismaModule],
  exports: [TagsService]
})
export class TagsModule {}
