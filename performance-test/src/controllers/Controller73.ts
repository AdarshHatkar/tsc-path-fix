import { injectable } from 'tsyringe';
import { Service73 } from '@services/Service73';
import { Model73 } from '@models/Model73';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller73 {
  constructor(private service: Service73, private prisma: PrismaClient) {}

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
