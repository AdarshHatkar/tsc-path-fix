import { injectable } from 'tsyringe';
import { Service112 } from '@services/Service112';
import { Model112 } from '@models/Model112';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller112 {
  constructor(
    private service: Service112,
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
