import { injectable } from 'tsyringe';
import { Service74 } from '@services/Service74';
import { Model74 } from '@models/Model74';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller74 {
  constructor(
    private service: Service74,
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
