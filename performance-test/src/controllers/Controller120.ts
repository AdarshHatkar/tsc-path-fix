import { injectable } from 'tsyringe';
import { Service120 } from '@services/Service120';
import { Model120 } from '@models/Model120';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller120 {
  constructor(
    private service: Service120,
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
