import { injectable } from 'tsyringe';
import { Service53 } from '@services/Service53';
import { Model53 } from '@models/Model53';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller53 {
  constructor(private service: Service53, private prisma: PrismaClient) {}

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
