import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
