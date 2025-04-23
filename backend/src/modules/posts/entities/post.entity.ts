import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from 'src/modules/basic/entities/basic.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';

export class Post extends BasicEntity {
  title: string;

  @ApiProperty({ description: 'Content of the post in markdown format' })
  content: string;

  @ApiProperty({ 
    description: 'Flag indicating if this is an article (true) or a question (false)',
    default: false
  })
  isArticle: boolean;

  authorId: number;

  tags: Tag[];
}