import { injectable } from 'tsyringe';
import { Service24 } from '@services/Service24';
import { Model24 } from '@models/Model24';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller24 {
  constructor(private service: Service24, private prisma: PrismaClient) {}

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
