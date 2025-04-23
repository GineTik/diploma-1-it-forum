import { Module, forwardRef } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { AiModule } from 'src/common/ai/ai.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [AiModule, PostsModule],
  exports: [TagsService]
})
export class TagsModule {}
