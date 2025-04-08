import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller50 } from '@controllers/Controller50';
import { Service50 } from '@services/Service50';
import { Model50 } from '@models/Model50';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller50);
const service = container.resolve(Service50);
const model = new Model50();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
