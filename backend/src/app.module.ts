import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PostsModule, TagsModule, AnswersModule, ConfigModule.forRoot()],
})
export class AppModule {}
