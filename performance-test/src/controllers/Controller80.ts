import { injectable } from 'tsyringe';
import { Service80 } from '@services/Service80';
import { Model80 } from '@models/Model80';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller80 {
  constructor(
    private service: Service80,
    private prisma: PrismaClient
  ) {}

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
