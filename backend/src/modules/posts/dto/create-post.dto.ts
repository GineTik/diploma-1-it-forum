import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
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

  @ApiProperty({ 
    description: 'Author of the post',
    example: 'John Doe'
  })
  author: string;

  @ApiProperty({ 
    description: 'Tags related to the post',
    type: [String],
    example: ['nestjs', 'javascript', 'backend']
  })
  tags: string[];
} 