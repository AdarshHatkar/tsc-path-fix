import { injectable } from 'tsyringe';
import { Service25 } from '@services/Service25';
import { Model25 } from '@models/Model25';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller25 {
  constructor(private service: Service25, private prisma: PrismaClient) {}

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
