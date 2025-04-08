import { injectable } from 'tsyringe';
import { Service107 } from '@services/Service107';
import { Model107 } from '@models/Model107';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller107 {
  constructor(
    private service: Service107,
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
