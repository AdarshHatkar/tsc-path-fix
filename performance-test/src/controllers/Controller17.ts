import { injectable } from 'tsyringe';
import { Service17 } from '@services/Service17';
import { Model17 } from '@models/Model17';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller17 {
  constructor(
    private service: Service17,
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
