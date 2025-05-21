import { DeepPartial } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(dto: DeepPartial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  update(id: string, dto: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  softDelete?(id: string): Promise<boolean>;
}
