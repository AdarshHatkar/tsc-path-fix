import { injectable } from 'tsyringe';
import { Service111 } from '@services/Service111';
import { Model111 } from '@models/Model111';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller111 {
  constructor(
    private service: Service111,
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
