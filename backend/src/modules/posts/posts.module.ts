import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AiModule } from 'src/common/ai/ai.module';
import { PostsRepository } from './posts.repository';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
  imports: [AiModule, PrismaModule, UserModule, forwardRef(() => TagsModule)]
})
export class PostsModule {}