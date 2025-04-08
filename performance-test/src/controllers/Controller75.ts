import { injectable } from 'tsyringe';
import { Service75 } from '@services/Service75';
import { Model75 } from '@models/Model75';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller75 {
  constructor(private service: Service75, private prisma: PrismaClient) {}

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
