import { injectable } from 'tsyringe';
import { Service1 } from '@services/Service1';
import { Model1 } from '@models/Model1';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller1 {
  constructor(private service: Service1, private prisma: PrismaClient) {}

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
