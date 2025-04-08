import { injectable } from 'tsyringe';
import { Service89 } from '@services/Service89';
import { Model89 } from '@models/Model89';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller89 {
  constructor(
    private service: Service89,
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
