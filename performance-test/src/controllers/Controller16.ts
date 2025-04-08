import { injectable } from 'tsyringe';
import { Service16 } from '@services/Service16';
import { Model16 } from '@models/Model16';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller16 {
  constructor(
    private service: Service16,
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
