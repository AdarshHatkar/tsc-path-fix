import { injectable } from 'tsyringe';
import { Service9 } from '@services/Service9';
import { Model9 } from '@models/Model9';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller9 {
  constructor(
    private service: Service9,
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
