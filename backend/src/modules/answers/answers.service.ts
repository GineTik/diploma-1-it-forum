import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { CrudService } from 'src/modules/basic/crud.service';

@Injectable()
export class AnswersService extends CrudService<Answer, CreateAnswerDto, UpdateAnswerDto> {

}
