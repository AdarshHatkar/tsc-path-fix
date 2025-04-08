import { injectable } from 'tsyringe';
import { Service69 } from '@services/Service69';
import { Model69 } from '@models/Model69';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller69 {
  constructor(
    private service: Service69,
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
