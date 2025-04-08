import { injectable } from 'tsyringe';
import { Service96 } from '@services/Service96';
import { Model96 } from '@models/Model96';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller96 {
  constructor(
    private service: Service96,
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
