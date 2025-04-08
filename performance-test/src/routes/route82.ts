import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller82 } from '@controllers/Controller82';
import { Service82 } from '@services/Service82';
import { Model82 } from '@models/Model82';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller82);
const service = container.resolve(Service82);
const model = new Model82();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
