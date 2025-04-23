export interface CrudOperations<TGet, TCreate, TUpdate> {
  create(createDto: TCreate): TGet | Promise<TGet>;
  findAll(): TGet[] | Promise<TGet[]>;
  findOne(id: number | string): TGet | Promise<TGet> | undefined | Promise<undefined>;
  update(id: number | string, updateDto: TUpdate): TGet | Promise<TGet> | undefined | Promise<undefined>;
  remove(id: number | string): TGet | Promise<TGet> | undefined | Promise<undefined>;
} 