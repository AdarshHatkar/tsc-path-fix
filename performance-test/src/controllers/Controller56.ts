import { injectable } from 'tsyringe';
import { Service56 } from '@services/Service56';
import { Model56 } from '@models/Model56';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller56 {
  constructor(
    private service: Service56,
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
