import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller20 } from '@controllers/Controller20';
import { Service20 } from '@services/Service20';
import { Model20 } from '@models/Model20';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller20);
const service = container.resolve(Service20);
const model = new Model20();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
