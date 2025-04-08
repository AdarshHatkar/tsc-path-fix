import { injectable } from 'tsyringe';
import { Service67 } from '@services/Service67';
import { Model67 } from '@models/Model67';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller67 {
  constructor(
    private service: Service67,
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
