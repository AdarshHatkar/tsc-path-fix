import { injectable } from 'tsyringe';
import { Service49 } from '@services/Service49';
import { Model49 } from '@models/Model49';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller49 {
  constructor(
    private service: Service49,
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
