import { injectable } from 'tsyringe';
import { Service42 } from '@services/Service42';
import { Model42 } from '@models/Model42';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller42 {
  constructor(
    private service: Service42,
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
