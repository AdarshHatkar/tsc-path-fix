import { injectable } from 'tsyringe';
import { Service68 } from '@services/Service68';
import { Model68 } from '@models/Model68';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller68 {
  constructor(
    private service: Service68,
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
