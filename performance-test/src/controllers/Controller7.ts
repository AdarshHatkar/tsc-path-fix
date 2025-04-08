import { injectable } from 'tsyringe';
import { Service7 } from '@services/Service7';
import { Model7 } from '@models/Model7';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller7 {
  constructor(
    private service: Service7,
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
