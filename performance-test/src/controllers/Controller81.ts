import { injectable } from 'tsyringe';
import { Service81 } from '@services/Service81';
import { Model81 } from '@models/Model81';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller81 {
  constructor(
    private service: Service81,
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
