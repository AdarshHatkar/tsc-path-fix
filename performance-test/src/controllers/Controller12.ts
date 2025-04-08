import { injectable } from 'tsyringe';
import { Service12 } from '@services/Service12';
import { Model12 } from '@models/Model12';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller12 {
  constructor(private service: Service12, private prisma: PrismaClient) {}

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
