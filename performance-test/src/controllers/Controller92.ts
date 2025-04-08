import { injectable } from 'tsyringe';
import { Service92 } from '@services/Service92';
import { Model92 } from '@models/Model92';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller92 {
  constructor(
    private service: Service92,
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
