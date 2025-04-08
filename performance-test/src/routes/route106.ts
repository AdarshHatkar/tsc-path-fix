import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller106 } from '@controllers/Controller106';
import { Service106 } from '@services/Service106';
import { Model106 } from '@models/Model106';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller106);
const service = container.resolve(Service106);
const model = new Model106();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
