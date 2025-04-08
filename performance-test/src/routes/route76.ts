import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller76 } from '@controllers/Controller76';
import { Service76 } from '@services/Service76';
import { Model76 } from '@models/Model76';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller76);
const service = container.resolve(Service76);
const model = new Model76();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
