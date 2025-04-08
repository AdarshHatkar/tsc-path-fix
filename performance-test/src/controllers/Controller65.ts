import { injectable } from 'tsyringe';
import { Service65 } from '@services/Service65';
import { Model65 } from '@models/Model65';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller65 {
  constructor(
    private service: Service65,
    private prisma: PrismaClient
  ) {}

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
