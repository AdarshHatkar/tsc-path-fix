import { injectable } from 'tsyringe';
import { Service86 } from '@services/Service86';
import { Model86 } from '@models/Model86';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller86 {
  constructor(
    private service: Service86,
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
