import { injectable } from 'tsyringe';
import { Service122 } from '@services/Service122';
import { Model122 } from '@models/Model122';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller122 {
  constructor(
    private service: Service122,
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
