import { injectable } from 'tsyringe';
import { Service30 } from '@services/Service30';
import { Model30 } from '@models/Model30';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller30 {
  constructor(private service: Service30, private prisma: PrismaClient) {}

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
