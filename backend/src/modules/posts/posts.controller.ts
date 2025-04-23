import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({ name: 'isArticle', required: false, description: 'Filter by article/question type', type: Boolean })
  @Get()
  findAll(@Query('isArticle') isArticle?: boolean) {
    return this.postsService.findAll(isArticle);
  }

  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiParam({ name: 'id', description: 'The id of the post' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const post = this.postsService.findOne(+id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiParam({ name: 'id', description: 'The id of the post to update' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = this.postsService.update(+id, updatePostDto);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiParam({ name: 'id', description: 'The id of the post to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const post = this.postsService.remove(+id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @ApiOperation({ summary: 'Get post excerpt' })
  @ApiResponse({ status: 200, description: 'Return the post excerpt.', type: String })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiParam({ name: 'id', description: 'The id of the post' })
  @Get(':id/ai/excerpt')
  makeExcerptFromContent(@Param('id') id: string) {
    return this.postsService.makeExcerptFromContent(+id);
  }
} 