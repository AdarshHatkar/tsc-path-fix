import { injectable } from 'tsyringe';
import { Service28 } from '@services/Service28';
import { Model28 } from '@models/Model28';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller28 {
  constructor(private service: Service28, private prisma: PrismaClient) {}

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
