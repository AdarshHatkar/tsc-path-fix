import { injectable } from 'tsyringe';
import { Service26 } from '@services/Service26';
import { Model26 } from '@models/Model26';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller26 {
  constructor(private service: Service26, private prisma: PrismaClient) {}

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
