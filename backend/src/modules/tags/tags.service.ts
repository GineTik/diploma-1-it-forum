import { Injectable, NotFoundException, Inject, forwardRef, Logger } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CrudService } from 'src/modules/basic/crud.service';
import { Tag } from './entities/tag.entity';
import { OpenRouterService } from 'src/common/ai/openrouter.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class TagsService extends CrudService<Tag, CreateTagDto, UpdateTagDto> {
  private readonly logger = new Logger(TagsService.name);

  constructor(
    private readonly openRouterService: OpenRouterService,
    private readonly postsService: PostsService
  ) {
    super();
  }

  async findAll(): Promise<Tag[]> {
    this.logger.log('Finding all tags');
    // Generate tags and store them in this.entities
    this.entities = ['nextjs', 'nestjs', 'js', 'ts', 'design', 'c#', 'asp.net core', 'database', 'prisma', 'ef core', 'react', 'nodejs', 'express', 'mongodb', 'postgresql', 'mysql', 'sql', 'api', 'rest', 'graphql', 'docker', 'kubernetes', 'aws', 'azure', 'ci/cd', 'devops', 'git', 'github', 'gitlab', 'bitbucket', 'npm', 'yarn', 'pnpm', 'webpack', 'vite', 'rollup', 'babel', 'typescript', 'javascript', 'html', 'css', 'scss', 'sass', 'less', 'postcss', 'tailwind', 'bootstrap', 'material-ui', 'antd', 'chakra-ui', 'mui', 'styled-components', 'emotion', 'storybook', 'jest', 'mocha', 'chai', 'sinon', 'enzyme', 'react-testing-library', 'cypress', 'puppeteer', 'playwright']
      .map((name, index) => ({ id: index, name } as Tag));
    
    this.logger.debug(`Generated ${this.entities.length} tags`);
    
    return this.entities;
  }

  async recommend(postId: number): Promise<Tag[]> {

    const post = await this.postsService.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const availableTags = await this.findAll();

    const prompt = `
      You are given a post and you need to recommend tags for it.
      The post title is "${post.title}", the post content is "${post.content}"
      The tags are: ${post.tags?.map(t => t.name).join(', ') ?? 'none'}
      Available tags are: ${availableTags.map(t => t.name).join(', ')}
      You need to recommend tags from the available tags.
      You need to recommend tags that are related to the post.
      Provide only a comma-separated list of tags, without any explanation.
      No more than 5 tags.
    `;

    var aiAnswer = await this.openRouterService.writeToAI(prompt);
    
    return aiAnswer
      .split(',')
      .map(tag => tag.trim())
      .map(tagName => this.entities.find(t => t.name.toLowerCase() === tagName.toLowerCase()));
  }
}
