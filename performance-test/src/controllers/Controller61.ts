import { injectable } from 'tsyringe';
import { Service61 } from '@services/Service61';
import { Model61 } from '@models/Model61';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller61 {
  constructor(private service: Service61, private prisma: PrismaClient) {}

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
