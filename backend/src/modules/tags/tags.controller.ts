import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Auth } from '../user/combined-auth.decorator';

@Controller()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('tags')
  @Auth()
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto);
  }

  @Get('tags')
  async findAll() {
    return await this.tagsService.findAll();
  }

  @Get('tags/:id')
  async findOne(@Param('id') id: string) {
    return await this.tagsService.findOne(+id);
  }

  @Patch('tags/:id')
  @Auth()
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagsService.update(+id, updateTagDto);
  }

  @Delete('tags/:id')
  @Auth()
  async remove(@Param('id') id: string) {
    return await this.tagsService.remove(+id);
  }

  @Get('posts/:id/tags/ai/recommend')
  async recommend(@Param('id') postId: string) {
    return await this.tagsService.recommend(+postId);
  }
}
