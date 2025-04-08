import { injectable } from 'tsyringe';
import { Service39 } from '@services/Service39';
import { Model39 } from '@models/Model39';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller39 {
  constructor(
    private service: Service39,
    private prisma: PrismaClient
  ) {}

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
