import { injectable } from 'tsyringe';
import { Service32 } from '@services/Service32';
import { Model32 } from '@models/Model32';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller32 {
  constructor(private service: Service32, private prisma: PrismaClient) {}

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
