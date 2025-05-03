import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, ParseBoolPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { ClerkId } from 'src/common/decorators/clerk-id.decorator';
import { ClerkPayloadDto } from '../user/dto/clerk-payload.dto';
import { Auth } from '../../common/decorators/combined-auth.decorator';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts/questions')
  @Auth()
  createQuestion(@Body() createPostDto: CreatePostDto, @ClerkId() user: ClerkPayloadDto) {
    return this.postsService.createQuestion(createPostDto, user.clerkId);
  }

  @Post('posts/articles')
  @Auth()
  createArticle(@Body() createPostDto: CreatePostDto, @ClerkId() user: ClerkPayloadDto) {
    return this.postsService.createArticle(createPostDto, user.clerkId);
  }

  @Get('posts/articles')
  @ApiQuery({ name: 'userId', required: false })
  findAllArticles(
    @Query('userId') userId?: string
  ) {
    return this.postsService.findAll({ isArticle: true, userId });
  }

  @Get('posts/questions')
  @ApiQuery({ name: 'userId', required: false })
  findAllQuestions(
    @Query('userId') userId?: string
  ) {
    return this.postsService.findAllQuestions({ userId });
  }

  @Get('posts/:id')
  findOne(@Param('id') id: string) {
    const post = this.postsService.findOne(+id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Patch('posts/:id')
  @Auth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = this.postsService.update(+id, updatePostDto);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Delete('posts/:id')
  @Auth()
  remove(@Param('id') id: string) {
    const post = this.postsService.remove(+id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Get('posts/:id/ai/excerpt')
  makeExcerptFromContent(@Param('id') id: string) {
    return this.postsService.makeExcerptFromContent(+id);
  }

  @Get('users/:authorId/posts')
  findAllByAuthorId(@Param('authorId') authorId: string) {
    return this.postsService.findAllByAuthorId(authorId);
  }
}