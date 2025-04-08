import { injectable } from 'tsyringe';
import { Service5 } from '@services/Service5';
import { Model5 } from '@models/Model5';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller5 {
  constructor(
    private service: Service5,
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
