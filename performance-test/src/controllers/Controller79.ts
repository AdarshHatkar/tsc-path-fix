import { injectable } from 'tsyringe';
import { Service79 } from '@services/Service79';
import { Model79 } from '@models/Model79';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller79 {
  constructor(private service: Service79, private prisma: PrismaClient) {}

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
