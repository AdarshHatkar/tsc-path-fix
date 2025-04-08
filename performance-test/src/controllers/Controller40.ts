import { injectable } from 'tsyringe';
import { Service40 } from '@services/Service40';
import { Model40 } from '@models/Model40';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller40 {
  constructor(private service: Service40, private prisma: PrismaClient) {}

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
