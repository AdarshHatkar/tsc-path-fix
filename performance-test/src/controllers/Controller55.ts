import { injectable } from 'tsyringe';
import { Service55 } from '@services/Service55';
import { Model55 } from '@models/Model55';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller55 {
  constructor(
    private service: Service55,
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
