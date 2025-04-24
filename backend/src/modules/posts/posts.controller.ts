import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { ClerkAuthGuard } from 'src/modules/user/clerk-auth.guard';
import { ClerkId } from 'src/modules/user/clerk-id.decorator';
import { ClerkPayloadDto } from '../user/dto/clerk-payload.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts/questions')
  @UseGuards(ClerkAuthGuard)
  @ApiBearerAuth('JWT-auth')
  createQuestion(@Body() createPostDto: CreatePostDto, @ClerkId() user: ClerkPayloadDto) {
    return this.postsService.createQuestion(createPostDto, user.clerkId);
  }

  @Post('posts/articles')
  @UseGuards(ClerkAuthGuard)
  @ApiBearerAuth('JWT-auth')
  createArticle(@Body() createPostDto: CreatePostDto, @ClerkId() user: ClerkPayloadDto) {
    return this.postsService.createArticle(createPostDto, user.clerkId);
  }

  @Get('posts/articles')
  findAllArticles() {
    return this.postsService.findAll(true);
  }

  @Get('posts/questions')
  findAllQuestions() {
    return this.postsService.findAll(false);
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
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = this.postsService.update(+id, updatePostDto);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Delete('posts/:id')
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