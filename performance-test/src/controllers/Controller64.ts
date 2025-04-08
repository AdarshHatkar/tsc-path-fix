import { injectable } from 'tsyringe';
import { Service64 } from '@services/Service64';
import { Model64 } from '@models/Model64';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller64 {
  constructor(
    private service: Service64,
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
