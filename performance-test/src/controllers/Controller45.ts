import { injectable } from 'tsyringe';
import { Service45 } from '@services/Service45';
import { Model45 } from '@models/Model45';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller45 {
  constructor(
    private service: Service45,
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
