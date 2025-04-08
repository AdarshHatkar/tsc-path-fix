import { injectable } from 'tsyringe';
import { Service3 } from '@services/Service3';
import { Model3 } from '@models/Model3';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller3 {
  constructor(
    private service: Service3,
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
