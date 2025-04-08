import { injectable } from 'tsyringe';
import { Service15 } from '@services/Service15';
import { Model15 } from '@models/Model15';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller15 {
  constructor(
    private service: Service15,
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
