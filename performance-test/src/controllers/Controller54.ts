import { injectable } from 'tsyringe';
import { Service54 } from '@services/Service54';
import { Model54 } from '@models/Model54';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller54 {
  constructor(private service: Service54, private prisma: PrismaClient) {}

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
