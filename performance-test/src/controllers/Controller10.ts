import { injectable } from 'tsyringe';
import { Service10 } from '@services/Service10';
import { Model10 } from '@models/Model10';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller10 {
  constructor(
    private service: Service10,
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
