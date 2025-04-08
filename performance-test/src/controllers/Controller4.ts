import { injectable } from 'tsyringe';
import { Service4 } from '@services/Service4';
import { Model4 } from '@models/Model4';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller4 {
  constructor(private service: Service4, private prisma: PrismaClient) {}

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
