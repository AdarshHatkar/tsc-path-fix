import { injectable } from 'tsyringe';
import { Service93 } from '@services/Service93';
import { Model93 } from '@models/Model93';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller93 {
  constructor(private service: Service93, private prisma: PrismaClient) {}

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
