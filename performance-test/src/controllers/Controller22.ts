import { injectable } from 'tsyringe';
import { Service22 } from '@services/Service22';
import { Model22 } from '@models/Model22';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller22 {
  constructor(private service: Service22, private prisma: PrismaClient) {}

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
