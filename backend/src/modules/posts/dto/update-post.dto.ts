import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Updated: Introduction to NestJS',
    required: false
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ 
    description: 'Content of the post',
    example: 'Updated content about NestJS...',
    required: false
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ 
    description: 'Flag indicating if this is an article (true) or a question (false)',
    example: true,
    required: false
  })
  isArticle?: boolean;

  @ApiProperty({
    description: 'Tags of the post',
    example: [1, 2, 3],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tags?: number[];
}