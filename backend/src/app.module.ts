import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AnswersModule } from './modules/answers/answers.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { SyncClerkUserMiddleware } from './common/middlewares/sync-clerk-user.middleware';

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
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
    consumer
      .apply(SyncClerkUserMiddleware)
      .forRoutes('*');
  }
}
