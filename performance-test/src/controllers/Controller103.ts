import { injectable } from 'tsyringe';
import { Service103 } from '@services/Service103';
import { Model103 } from '@models/Model103';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller103 {
  constructor(
    private service: Service103,
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
