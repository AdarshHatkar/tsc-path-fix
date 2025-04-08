import { injectable } from 'tsyringe';
import { Service101 } from '@services/Service101';
import { Model101 } from '@models/Model101';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller101 {
  constructor(
    private service: Service101,
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
