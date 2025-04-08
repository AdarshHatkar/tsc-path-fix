import { injectable } from 'tsyringe';
import { Service35 } from '@services/Service35';
import { Model35 } from '@models/Model35';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller35 {
  constructor(
    private service: Service35,
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
