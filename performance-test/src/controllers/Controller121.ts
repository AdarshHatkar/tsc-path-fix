import { injectable } from 'tsyringe';
import { Service121 } from '@services/Service121';
import { Model121 } from '@models/Model121';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller121 {
  constructor(private service: Service121, private prisma: PrismaClient) {}

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
