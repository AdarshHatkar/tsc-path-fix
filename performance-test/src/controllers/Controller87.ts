import { injectable } from 'tsyringe';
import { Service87 } from '@services/Service87';
import { Model87 } from '@models/Model87';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller87 {
  constructor(private service: Service87, private prisma: PrismaClient) {}

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
