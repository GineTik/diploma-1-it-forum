import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreatePostWithAuthorIdDto {
  @ApiProperty({ 
    description: 'Title of the post',
    example: 'Introduction to NestJS'
  })
  @IsString()
  title: string;

  @ApiProperty({ 
    description: 'Content of the post',
    example: 'NestJS is a framework for building efficient, scalable Node.js server-side applications...'
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Flag indicating if this is an article (true) or a question (false)',
    default: false,
    example: false
  })
  isArticle: boolean;

  authorId: string;

  @ApiProperty({ 
    description: 'Tags of the post',
    example: [1, 2, 3]
  })
  @IsArray()
  tags: number[];
} 

export class CreatePostDto extends OmitType(CreatePostWithAuthorIdDto, ['authorId', 'isArticle']) {}