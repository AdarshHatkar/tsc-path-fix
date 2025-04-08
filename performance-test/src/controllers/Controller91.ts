import { injectable } from 'tsyringe';
import { Service91 } from '@services/Service91';
import { Model91 } from '@models/Model91';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller91 {
  constructor(private service: Service91, private prisma: PrismaClient) {}

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
