import { injectable } from 'tsyringe';
import { Service105 } from '@services/Service105';
import { Model105 } from '@models/Model105';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller105 {
  constructor(private service: Service105, private prisma: PrismaClient) {}

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
