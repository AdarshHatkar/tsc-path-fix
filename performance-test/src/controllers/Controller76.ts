import { injectable } from 'tsyringe';
import { Service76 } from '@services/Service76';
import { Model76 } from '@models/Model76';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller76 {
  constructor(
    private service: Service76,
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
