import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ClerkPayloadDto } from '../user/dto/clerk-payload.dto';
import { ClerkId } from '../user/clerk-id.decorator';
import { Auth } from 'src/modules/user/combined-auth.decorator';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post('answers')
  @Auth()
  create(@Body() createAnswerDto: CreateAnswerDto, @ClerkId() user: ClerkPayloadDto) {
    return this.answersService.create(createAnswerDto, user.clerkId);
  }

  @Get('answers')
  findAll() {
    return this.answersService.findAll();
  }

  @Get('answers/:id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch('answers/:id')
  @Auth()
  update(@Param('id') id: string, @ClerkId() user: ClerkPayloadDto, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, user.clerkId, updateAnswerDto);
  }

  @Patch('answers/:id/mark-as-correct')
  @Auth()
  markAsCorrect(@Param('id') id: string, @ClerkId() user: ClerkPayloadDto) {
    return this.answersService.markAsCorrect(+id, user.clerkId);
  }

  @Delete('answers/:id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }

  @Get('posts/:postId/answers')
  findAllByPostId(@Param('postId') id: string) {
    return this.answersService.findAllByPostId(+id);
  }
}
