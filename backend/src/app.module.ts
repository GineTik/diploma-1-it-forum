import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SyncClerkUserMiddleware } from './modules/user/sync-clerk-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AnswersModule } from './modules/answers/answers.module';

@Module({
  imports: [
    PostsModule, 
    TagsModule, 
    UserModule, 
    AnswersModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SyncClerkUserMiddleware,
    },
  ]
})
export class AppModule {}
