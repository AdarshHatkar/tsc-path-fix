import { injectable } from 'tsyringe';
import { Service113 } from '@services/Service113';
import { Model113 } from '@models/Model113';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller113 {
  constructor(
    private service: Service113,
    private prisma: PrismaClient
  ) {}

  async getAll() {
    return this.service.findAll();
  }

  async getById(id: string) {
    return this.service.findById(id);
  }

  async create(data: any) {
    return this.service.create(data);
  }

  async update(id: string, data: any) {
    return this.service.update(id, data);
  }

  async delete(id: string) {
    return this.service.delete(id);
  }
}
