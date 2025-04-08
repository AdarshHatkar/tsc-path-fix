import { injectable } from 'tsyringe';
import { Service106 } from '@services/Service106';
import { Model106 } from '@models/Model106';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller106 {
  constructor(
    private service: Service106,
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
