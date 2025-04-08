import { injectable } from 'tsyringe';
import { Service82 } from '@services/Service82';
import { Model82 } from '@models/Model82';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller82 {
  constructor(private service: Service82, private prisma: PrismaClient) {}

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
