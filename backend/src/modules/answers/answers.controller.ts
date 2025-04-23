import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post('answers')
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get('posts/:id/answers')
  findAllByPostId(@Param('id') id: string) {
    return this.answersService.findAll();
  }

  @Get('answers/:id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch('answers/:id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete('answers/:id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
