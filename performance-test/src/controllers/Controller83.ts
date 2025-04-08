import { injectable } from 'tsyringe';
import { Service83 } from '@services/Service83';
import { Model83 } from '@models/Model83';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller83 {
  constructor(
    private service: Service83,
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
