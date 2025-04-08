import { injectable } from 'tsyringe';
import { Service77 } from '@services/Service77';
import { Model77 } from '@models/Model77';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller77 {
  constructor(private service: Service77, private prisma: PrismaClient) {}

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
