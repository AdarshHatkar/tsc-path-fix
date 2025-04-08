import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller10 } from '@controllers/Controller10';
import { Service10 } from '@services/Service10';
import { Model10 } from '@models/Model10';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller10);
const service = container.resolve(Service10);
const model = new Model10();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
