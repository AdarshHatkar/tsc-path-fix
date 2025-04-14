import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const TOTAL_FILES = 5000;
const DIRECTORIES = [
  'routes',
  'controllers',
  'services',
  'models',
  'middleware',
  'utils',
  'types',
  'config'
];

function generateRouteContent(index) {
  return `import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller${index} } from '@controllers/Controller${index}';
import { Service${index} } from '@services/Service${index}';
import { Model${index} } from '@models/Model${index}';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller${index});
const service = container.resolve(Service${index});
const model = new Model${index}();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;`;
}

function generateControllerContent(index) {
  return `import { injectable } from 'tsyringe';
import { Service${index} } from '@services/Service${index}';
import { Model${index} } from '@models/Model${index}';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller${index} {
  constructor(
    private service: Service${index},
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
}`;
}

function generateServiceContent(index) {
  return `import { injectable } from 'tsyringe';
import { Model${index} } from '@models/Model${index}';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Service${index} {
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
}`;
}

function generateModelContent(index) {
  return `import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

export class Model${index} {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

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
}`;
}

function ensureDirectoryExists(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function generateFiles() {
  const baseDir = join(process.cwd(), 'src');

  DIRECTORIES.forEach((dir) => {
    const fullPath = join(baseDir, dir);
    ensureDirectoryExists(fullPath);
  });

  const filesPerType = Math.ceil(TOTAL_FILES / 4); // Split between routes, controllers, services, and models

  for (let i = 0; i < filesPerType; i++) {
    // Generate route files
    writeFileSync(
      join(baseDir, 'routes', `route${i}.ts`),
      generateRouteContent(i)
    );

    // Generate controller files
    writeFileSync(
      join(baseDir, 'controllers', `Controller${i}.ts`),
      generateControllerContent(i)
    );

    // Generate service files
    writeFileSync(
      join(baseDir, 'services', `Service${i}.ts`),
      generateServiceContent(i)
    );

    // Generate model files
    writeFileSync(
      join(baseDir, 'models', `Model${i}.ts`),
      generateModelContent(i)
    );
  }
}

generateFiles();
console.log('Generated test files successfully!');
