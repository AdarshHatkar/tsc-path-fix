import { injectable } from 'tsyringe';
import { Service115 } from '@services/Service115';
import { Model115 } from '@models/Model115';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller115 {
  constructor(
    private service: Service115,
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
