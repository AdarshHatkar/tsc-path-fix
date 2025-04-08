import { injectable } from 'tsyringe';
import { Service60 } from '@services/Service60';
import { Model60 } from '@models/Model60';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller60 {
  constructor(private service: Service60, private prisma: PrismaClient) {}

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
