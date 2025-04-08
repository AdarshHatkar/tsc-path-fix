export class PrismaClient {
  user = {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data) => data,
    update: async (data) => data,
    delete: async () => null
  };

  async $disconnect() {}
}
