import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller100 } from '@controllers/Controller100';
import { Service100 } from '@services/Service100';
import { Model100 } from '@models/Model100';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller100);
const service = container.resolve(Service100);
const model = new Model100();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
