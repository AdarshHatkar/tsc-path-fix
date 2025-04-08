import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller59 } from '@controllers/Controller59';
import { Service59 } from '@services/Service59';
import { Model59 } from '@models/Model59';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller59);
const service = container.resolve(Service59);
const model = new Model59();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
