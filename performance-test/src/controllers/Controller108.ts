import { injectable } from 'tsyringe';
import { Service108 } from '@services/Service108';
import { Model108 } from '@models/Model108';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller108 {
  constructor(private service: Service108, private prisma: PrismaClient) {}

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
