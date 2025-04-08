import { injectable } from 'tsyringe';
import { Service117 } from '@services/Service117';
import { Model117 } from '@models/Model117';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller117 {
  constructor(
    private service: Service117,
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
