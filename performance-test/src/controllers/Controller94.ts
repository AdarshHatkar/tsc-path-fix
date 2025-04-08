import { injectable } from 'tsyringe';
import { Service94 } from '@services/Service94';
import { Model94 } from '@models/Model94';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller94 {
  constructor(
    private service: Service94,
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
