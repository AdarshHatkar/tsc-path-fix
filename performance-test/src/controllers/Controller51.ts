import { injectable } from 'tsyringe';
import { Service51 } from '@services/Service51';
import { Model51 } from '@models/Model51';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller51 {
  constructor(
    private service: Service51,
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
