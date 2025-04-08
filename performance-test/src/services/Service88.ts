import { injectable } from 'tsyringe';
import { Model88 } from '@models/Model88';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Service88 {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
