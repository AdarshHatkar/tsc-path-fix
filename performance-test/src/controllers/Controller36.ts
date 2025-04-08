import { injectable } from 'tsyringe';
import { Service36 } from '@services/Service36';
import { Model36 } from '@models/Model36';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller36 {
  constructor(private service: Service36, private prisma: PrismaClient) {}

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
