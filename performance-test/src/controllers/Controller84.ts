import { injectable } from 'tsyringe';
import { Service84 } from '@services/Service84';
import { Model84 } from '@models/Model84';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller84 {
  constructor(private service: Service84, private prisma: PrismaClient) {}

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
