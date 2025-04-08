import { injectable } from 'tsyringe';
import { Service23 } from '@services/Service23';
import { Model23 } from '@models/Model23';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller23 {
  constructor(private service: Service23, private prisma: PrismaClient) {}

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
