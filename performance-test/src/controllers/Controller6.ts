import { injectable } from 'tsyringe';
import { Service6 } from '@services/Service6';
import { Model6 } from '@models/Model6';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller6 {
  constructor(
    private service: Service6,
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
