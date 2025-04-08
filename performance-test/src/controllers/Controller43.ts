import { injectable } from 'tsyringe';
import { Service43 } from '@services/Service43';
import { Model43 } from '@models/Model43';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller43 {
  constructor(
    private service: Service43,
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
