import { injectable } from 'tsyringe';
import { Service97 } from '@services/Service97';
import { Model97 } from '@models/Model97';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller97 {
  constructor(private service: Service97, private prisma: PrismaClient) {}

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
