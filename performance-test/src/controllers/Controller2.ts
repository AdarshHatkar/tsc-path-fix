import { injectable } from 'tsyringe';
import { Service2 } from '@services/Service2';
import { Model2 } from '@models/Model2';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller2 {
  constructor(private service: Service2, private prisma: PrismaClient) {}

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
