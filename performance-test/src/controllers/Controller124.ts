import { injectable } from 'tsyringe';
import { Service124 } from '@services/Service124';
import { Model124 } from '@models/Model124';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller124 {
  constructor(private service: Service124, private prisma: PrismaClient) {}

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
