import { injectable } from 'tsyringe';
import { Service13 } from '@services/Service13';
import { Model13 } from '@models/Model13';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller13 {
  constructor(
    private service: Service13,
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
