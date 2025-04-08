import { injectable } from 'tsyringe';
import { Service8 } from '@services/Service8';
import { Model8 } from '@models/Model8';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller8 {
  constructor(private service: Service8, private prisma: PrismaClient) {}

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
