import { Injectable, NotFoundException, Inject, forwardRef, Logger } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { OpenRouterService } from 'src/common/ai/openrouter.service';
import { PostsService } from '../posts/posts.service';
import { Tag } from 'generated/prisma';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(
    private readonly openRouterService: OpenRouterService,
    private readonly postsService: PostsService,
    private readonly tagsRepository: TagsRepository
  ) {}

  public async create(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagsRepository.create(createTagDto);
  }

  public async findAll(): Promise<Tag[]> {
    return await this.tagsRepository.findAll();
  }

  public async findByPostId(postId: number): Promise<Tag[]> {
    return await this.tagsRepository.findByPostId(postId);
  }

  public async findOne(id: number): Promise<Tag | null> {
    var tag = await this.tagsRepository.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  public async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    await this.throwIfNotExists(id);
    return await this.tagsRepository.update(id, updateTagDto);
  }

  public async remove(id: number): Promise<Tag> {
    await this.throwIfNotExists(id);
    return await this.tagsRepository.remove(id);
  }
  
  public async recommend(title: string, content: string): Promise<Tag[]> {
    const availableTags = await this.findAll();

    const prompt = `
      You are given a post and you need to recommend tags for it.
      The post title is "${title}", the post content is "${content}"
      Available tags are: ${availableTags.map(t => t.name).join(', ')}
      You need to recommend tags from the available tags.
      You need to recommend tags that are related to the post.
      Provide only a comma-separated list of tags, without any explanation.
      No more than 5 tags.
    `;

    var aiAnswer = await this.openRouterService.writeToAI(prompt);
    
    return this.parseAiTags(aiAnswer, availableTags);
  }

  private parseAiTags(aiAnswer: string, availableTags: Tag[]): Tag[] {
    return aiAnswer
      .split(',')
      .map(tag => tag.trim())
      .filter(tagName => tagName.length > 0)
      .map((tagName) => {
        const foundTag = availableTags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
        return foundTag || null;
      })
      .filter(tag => tag !== null);
  }


  private async throwIfNotExists(id: number) {
    if (!(await this.tagsRepository.exists(id))) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }
}
