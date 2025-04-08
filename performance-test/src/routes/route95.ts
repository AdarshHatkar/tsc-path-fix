import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller95 } from '@controllers/Controller95';
import { Service95 } from '@services/Service95';
import { Model95 } from '@models/Model95';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller95);
const service = container.resolve(Service95);
const model = new Model95();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
