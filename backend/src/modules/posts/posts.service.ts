import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CrudService } from '../basic/crud.service';
import { Post } from './entities/post.entity';
import { OpenRouterService } from 'src/common/ai/openrouter.service';

@Injectable()
export class PostsService extends CrudService<Post, CreatePostDto, UpdatePostDto> {

  constructor(
    private readonly openRouterService: OpenRouterService
  ) {
    super();

    this.entities = [
      {
        id: 1,
        title: 'Початок роботи з NestJS',
        content: 'NestJS - це прогресивний Node.js фреймворк для створення ефективних, надійних та масштабованих серверних додатків. Він використовує сучасний JavaScript, побудований на TypeScript та поєднує елементи ООП, ФП та ФРП.',
        isArticle: true,
        tags: [],
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Розуміння узагальнень TypeScript',
        content: 'Узагальнення TypeScript дозволяють нам писати багаторазовий код, який працює з різними типами. Вони допомагають нам підтримувати типобезпеку, надаючи гнучкість у нашому коді.',
        isArticle: true,
        tags: [],
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Найкращі практики проектування REST API',
        content: 'Проектування REST API вимагає ретельного розгляду ресурсів, кінцевих точок, HTTP методів, кодів статусу та іншого. Дотримання найкращих практик забезпечує інтуїтивність, підтримуваність та масштабованість вашого API.',
        isArticle: true,
        tags: [],
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  async findAll(isArticle?: boolean): Promise<Post[]> {
    return isArticle == null
      ? this.entities
      : this.entities.filter(post => post.isArticle === isArticle);
  }

  async makeExcerptFromContent(postId: number): Promise<string> {
    const post = await this.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    
    const prompt = `
      Make a short excerpt from the content of the post with title "${post.title}" and content "${post.content}".

      The excerpt should be a short summary of the post.

      The excerpt should be in Ukrainian. Write the result in Ukrainian language, even if the instruction is in English.

      The excerpt should be no longer than 100 words.
    `;

    return await this.openRouterService.writeToAI(prompt);
  }
}