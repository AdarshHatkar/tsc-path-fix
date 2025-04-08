import { injectable } from 'tsyringe';
import { Service18 } from '@services/Service18';
import { Model18 } from '@models/Model18';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller18 {
  constructor(private service: Service18, private prisma: PrismaClient) {}

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
