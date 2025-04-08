import { injectable } from 'tsyringe';
import { Service116 } from '@services/Service116';
import { Model116 } from '@models/Model116';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller116 {
  constructor(private service: Service116, private prisma: PrismaClient) {}

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
