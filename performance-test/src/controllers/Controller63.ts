import { injectable } from 'tsyringe';
import { Service63 } from '@services/Service63';
import { Model63 } from '@models/Model63';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller63 {
  constructor(private service: Service63, private prisma: PrismaClient) {}

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
