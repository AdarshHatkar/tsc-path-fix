import { injectable } from 'tsyringe';
import { Service47 } from '@services/Service47';
import { Model47 } from '@models/Model47';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller47 {
  constructor(private service: Service47, private prisma: PrismaClient) {}

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
