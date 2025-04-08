import { injectable } from 'tsyringe';
import { Service58 } from '@services/Service58';
import { Model58 } from '@models/Model58';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller58 {
  constructor(private service: Service58, private prisma: PrismaClient) {}

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
