import { injectable } from 'tsyringe';
import { Service0 } from '@services/Service0';
import { Model0 } from '@models/Model0';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller0 {
  constructor(
    private service: Service0,
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
