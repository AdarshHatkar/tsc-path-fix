import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller112 } from '@controllers/Controller112';
import { Service112 } from '@services/Service112';
import { Model112 } from '@models/Model112';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller112);
const service = container.resolve(Service112);
const model = new Model112();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
