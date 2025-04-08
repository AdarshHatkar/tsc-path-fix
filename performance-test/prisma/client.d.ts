export class PrismaClient {
  user: {
    findMany(): Promise<any[]>;
    findUnique(params: { where: { id: string } }): Promise<any>;
    create(params: { data: any }): Promise<any>;
    update(params: { where: { id: string }; data: any }): Promise<any>;
    delete(params: { where: { id: string } }): Promise<any>;
  };
  $disconnect(): Promise<void>;
}
