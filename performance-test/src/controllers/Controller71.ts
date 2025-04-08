import { injectable } from 'tsyringe';
import { Service71 } from '@services/Service71';
import { Model71 } from '@models/Model71';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller71 {
  constructor(
    private service: Service71,
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
