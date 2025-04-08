import { injectable } from 'tsyringe';
import { Service31 } from '@services/Service31';
import { Model31 } from '@models/Model31';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller31 {
  constructor(private service: Service31, private prisma: PrismaClient) {}

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
