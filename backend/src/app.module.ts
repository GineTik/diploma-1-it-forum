import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PostsModule, TagsModule, ConfigModule.forRoot()],
})
export class AppModule {}
