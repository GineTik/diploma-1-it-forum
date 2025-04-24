import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreatePostWithAuthorIdDto {
  @ApiProperty({ 
    description: 'Title of the post',
    example: 'Introduction to NestJS'
  })
  title: string;

  @ApiProperty({ 
    description: 'Content of the post',
    example: 'NestJS is a framework for building efficient, scalable Node.js server-side applications...'
  })
  content: string;

  @ApiProperty({ 
    description: 'Flag indicating if this is an article (true) or a question (false)',
    default: false,
    example: false
  })
  isArticle: boolean;

  authorId: string;

  tags: number[];
} 

export class CreatePostDto extends OmitType(CreatePostWithAuthorIdDto, ['authorId', 'isArticle']) {

}