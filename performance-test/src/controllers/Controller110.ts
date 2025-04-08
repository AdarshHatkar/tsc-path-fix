import { injectable } from 'tsyringe';
import { Service110 } from '@services/Service110';
import { Model110 } from '@models/Model110';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller110 {
  constructor(private service: Service110, private prisma: PrismaClient) {}

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
