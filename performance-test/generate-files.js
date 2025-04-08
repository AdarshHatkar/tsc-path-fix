const fs = require('fs');
const path = require('path');

// Configuration
const NUM_MODELS = 20;
const NUM_CONTROLLERS = 20;
const NUM_SERVICES = 20;

// Create necessary directories
const dirs = [
  'src/routes',
  'src/controllers',
  'src/services',
  'src/models',
  'src/middleware',
  'src/utils',
  'src/types',
  'src/config'
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate utility files
for (let i = 0; i < 10; i++) {
  const content = `export const util${i} = () => {
  return \`Utility function ${i}\`;
};

export const formatResponse${i} = (data: any) => {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
};`;
  fs.writeFileSync(path.join('src/utils', `util${i}.ts`), content);
}

// Generate model interfaces
for (let i = 0; i < NUM_MODELS; i++) {
  const content = `import { Document } from 'mongoose';

export interface IModel${i} extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive';
  metadata: {
    version: number;
    tags: string[];
  };
}

export interface IModel${i}DTO {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string[];
}`;
  fs.writeFileSync(path.join('src/models', `Model${i}.ts`), content);
}

// Generate service files
for (let i = 0; i < NUM_SERVICES; i++) {
  const imports = [];
  const usedModels = new Set();

  // Generate unique model imports
  while (imports.length < 3) {
    const modelIndex = Math.floor(Math.random() * NUM_MODELS);
    if (!usedModels.has(modelIndex)) {
      usedModels.add(modelIndex);
      imports.push(
        `import { IModel${modelIndex}, IModel${modelIndex}DTO } from '@models/Model${modelIndex}';`
      );
    }
  }

  const content = `import { injectable } from 'tsyringe';
${imports.join('\n')}
import { formatResponse${i % 10} } from '@utils/util${i % 10}';

@injectable()
export class Service${i} {
  async findAll(): Promise<IModel${Array.from(usedModels)[0]}[]> {
    // Implementation
    return [];
  }

  async findById(id: string): Promise<IModel${
    Array.from(usedModels)[0]
  } | null> {
    // Implementation
    return null;
  }

  async create(data: IModel${Array.from(usedModels)[0]}DTO): Promise<IModel${
    Array.from(usedModels)[0]
  }> {
    // Implementation
    return {} as IModel${Array.from(usedModels)[0]};
  }

  async update(id: string, data: Partial<IModel${
    Array.from(usedModels)[0]
  }DTO>): Promise<IModel${Array.from(usedModels)[0]} | null> {
    // Implementation
    return null;
  }

  async delete(id: string): Promise<boolean> {
    // Implementation
    return true;
  }
}`;

  fs.writeFileSync(path.join('src/services', `Service${i}.ts`), content);
}

// Generate controller files
for (let i = 0; i < NUM_CONTROLLERS; i++) {
  const serviceIndex = i % NUM_SERVICES;
  const content = `import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { Service${serviceIndex} } from '@services/Service${serviceIndex}';
import { util${i % 10} } from '@utils/util${i % 10}';

@injectable()
export class Controller${i} {
  constructor(
    @inject(Service${serviceIndex}) private service: Service${serviceIndex}
  ) {}

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.findById(req.params.id);
      if (!item) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.service.delete(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}`;

  fs.writeFileSync(path.join('src/controllers', `Controller${i}.ts`), content);
}

// Generate route files
for (let i = 0; i < NUM_CONTROLLERS; i++) {
  const content = `import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller${i} } from '@controllers/Controller${i}';

const router = Router();
const controller = container.resolve(Controller${i});

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;`;

  fs.writeFileSync(path.join('src/routes', `route${i}.ts`), content);
}

// Generate main app file
const routeImports = Array.from(
  { length: NUM_CONTROLLERS },
  (_, i) => `import route${i} from '@routes/route${i}';`
).join('\n');

const appContent = `import 'reflect-metadata';
import express from 'express';
import { container } from 'tsyringe';
${routeImports}

const app = express();

app.use(express.json());

${Array.from(
  { length: NUM_CONTROLLERS },
  (_, i) => `app.use('/api/resource${i}', route${i});`
).join('\n')}

export default app;`;

fs.writeFileSync('src/app.ts', appContent);

// Generate index file
const indexContent = `import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`;

fs.writeFileSync('src/index.ts', indexContent);

// Generate types file
const typesContent = `export interface ErrorResponse {
  error: string;
  code?: number;
  details?: unknown;
}

export interface SuccessResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}`;

fs.writeFileSync('src/types/common.ts', typesContent);
