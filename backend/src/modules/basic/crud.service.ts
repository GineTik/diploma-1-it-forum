import { Injectable, NotFoundException } from '@nestjs/common';
import { BasicEntity } from './entities/basic.entity';
import { CrudOperations } from './crud.interface';

@Injectable()
export class CrudService<
  TGet extends BasicEntity,
  TCreate,
  TUpdate>
  implements CrudOperations<TGet, TCreate, TUpdate> {
  
  protected entities: TGet[] = [];

  create(createDto: TCreate): TGet {
    const newId = Math.max(0, ...this.entities.map(entity => Number(entity.id))) + 1;

    const newEntity = {
      ...createDto,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as TGet;

    this.entities.push(newEntity);
    return newEntity;
  }

  async findAll(): Promise<TGet[]> {
    return this.entities;
  }

  async findOne(id: number | string): Promise<TGet | undefined> {
    return this.entities.find(entity => entity.id === id);
  }

  update(id: number | string, updateDto: TUpdate): TGet | undefined {
    const index = this.entities.findIndex(entity => entity.id === id);
    if (index === -1) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    
    this.entities[index] = {
      ...this.entities[index],
      ...updateDto,
      updatedAt: new Date(),
    };
    
    return this.entities[index];
  }

  remove(id: number): TGet | undefined {
    const index = this.entities.findIndex(entity => entity.id === id);
    if (index === -1) {
      return undefined;
    }
    
    const removed = this.entities[index];
    this.entities.splice(index, 1);
    
    return removed;
  }
} 