import { injectable } from 'tsyringe';
import { Service70 } from '@services/Service70';
import { Model70 } from '@models/Model70';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller70 {
  constructor(
    private service: Service70,
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
