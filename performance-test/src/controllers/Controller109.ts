import { injectable } from 'tsyringe';
import { Service109 } from '@services/Service109';
import { Model109 } from '@models/Model109';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller109 {
  constructor(private service: Service109, private prisma: PrismaClient) {}

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
