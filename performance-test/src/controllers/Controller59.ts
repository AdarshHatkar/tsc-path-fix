import { injectable } from 'tsyringe';
import { Service59 } from '@services/Service59';
import { Model59 } from '@models/Model59';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller59 {
  constructor(
    private service: Service59,
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
