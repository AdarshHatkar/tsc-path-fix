import { injectable } from 'tsyringe';
import { Service62 } from '@services/Service62';
import { Model62 } from '@models/Model62';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller62 {
  constructor(private service: Service62, private prisma: PrismaClient) {}

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
