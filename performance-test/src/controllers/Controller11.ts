import { injectable } from 'tsyringe';
import { Service11 } from '@services/Service11';
import { Model11 } from '@models/Model11';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller11 {
  constructor(private service: Service11, private prisma: PrismaClient) {}

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
