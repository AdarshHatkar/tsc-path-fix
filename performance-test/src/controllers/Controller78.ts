import { injectable } from 'tsyringe';
import { Service78 } from '@services/Service78';
import { Model78 } from '@models/Model78';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller78 {
  constructor(
    private service: Service78,
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
