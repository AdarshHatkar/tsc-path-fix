import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller92 } from '@controllers/Controller92';
import { Service92 } from '@services/Service92';
import { Model92 } from '@models/Model92';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller92);
const service = container.resolve(Service92);
const model = new Model92();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
