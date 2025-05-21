import { Repository, DeepPartial, DataSource, ObjectLiteral } from 'typeorm';

import { BaseRepositoryInterface } from './base-interface.repository';

export abstract class BaseRepositoryAbstract<T extends ObjectLiteral>
  implements BaseRepositoryInterface<T>
{
  protected readonly repository: Repository<T>;

  constructor(
    protected readonly dataSource: DataSource,
    entity: new () => T,
  ) {
    this.repository = dataSource.getRepository(entity);
  }

  async create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    await this.repository.update(id, dto);
    const updated = await this.findOne(id);
    if (!updated) throw new Error('Entity not found');
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const isDeleted = await this.repository.delete(id);
    if (isDeleted.affected === 0) throw new Error('Entity not found');
    return true;
  }

  async softDelete(id: string): Promise<boolean> {
    if ('softDelete' in this.repository) {
      const isDeleted = await this.repository.softDelete(id);
      if (isDeleted.affected === 0) throw new Error('Entity not found');
      return true;
    } else {
      throw new Error('Entity does not support softDelete');
    }
  }
}
