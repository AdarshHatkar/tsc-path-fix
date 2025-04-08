import { injectable } from 'tsyringe';
import { Service14 } from '@services/Service14';
import { Model14 } from '@models/Model14';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller14 {
  constructor(private service: Service14, private prisma: PrismaClient) {}

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
