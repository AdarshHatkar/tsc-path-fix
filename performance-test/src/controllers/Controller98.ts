import { injectable } from 'tsyringe';
import { Service98 } from '@services/Service98';
import { Model98 } from '@models/Model98';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller98 {
  constructor(
    private service: Service98,
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
