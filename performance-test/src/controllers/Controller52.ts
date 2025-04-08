import { injectable } from 'tsyringe';
import { Service52 } from '@services/Service52';
import { Model52 } from '@models/Model52';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller52 {
  constructor(
    private service: Service52,
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
