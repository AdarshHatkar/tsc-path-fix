import { injectable } from 'tsyringe';
import { Service41 } from '@services/Service41';
import { Model41 } from '@models/Model41';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller41 {
  constructor(
    private service: Service41,
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
