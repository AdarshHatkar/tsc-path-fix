import { injectable } from 'tsyringe';
import { Service118 } from '@services/Service118';
import { Model118 } from '@models/Model118';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller118 {
  constructor(
    private service: Service118,
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
