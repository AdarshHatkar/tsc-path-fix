import { injectable } from 'tsyringe';
import { Service46 } from '@services/Service46';
import { Model46 } from '@models/Model46';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller46 {
  constructor(
    private service: Service46,
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
