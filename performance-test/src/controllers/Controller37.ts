import { injectable } from 'tsyringe';
import { Service37 } from '@services/Service37';
import { Model37 } from '@models/Model37';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller37 {
  constructor(
    private service: Service37,
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
