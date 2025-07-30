export interface Repository<T> {
  create(id: string, body: any): Promise<T>;
  // read(id: string): Promise<T | null>;
  // update(id: string, item: T): Promise<T | null>;
  // delete(id: string): Promise<void>;
  // list(): Promise<T[]>;
  // count(): Promise<number>;
}