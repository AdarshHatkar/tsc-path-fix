import { injectable } from 'tsyringe';
import { Service20 } from '@services/Service20';
import { Model20 } from '@models/Model20';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller20 {
  constructor(
    private service: Service20,
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
