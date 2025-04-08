import { injectable } from 'tsyringe';
import { Service34 } from '@services/Service34';
import { Model34 } from '@models/Model34';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller34 {
  constructor(private service: Service34, private prisma: PrismaClient) {}

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
