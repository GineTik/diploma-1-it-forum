import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Updated: Introduction to NestJS',
    required: false
  })
  title?: string;

  @ApiProperty({ 
    description: 'Content of the post',
    example: 'Updated content about NestJS...',
    required: false
  })
  content?: string;

  @ApiProperty({ 
    description: 'Flag indicating if this is an article (true) or a question (false)',
    example: true,
    required: false
  })
  isArticle?: boolean;

  @ApiProperty({ 
    description: 'Tags related to the post',
    type: [String],
    example: ['nestjs', 'typescript', 'backend'],
    required: false
  })
  tags?: string[];
} 