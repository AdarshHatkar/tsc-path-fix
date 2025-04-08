import { injectable } from 'tsyringe';
import { Service72 } from '@services/Service72';
import { Model72 } from '@models/Model72';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller72 {
  constructor(private service: Service72, private prisma: PrismaClient) {}

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
