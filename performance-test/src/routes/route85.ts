import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller85 } from '@controllers/Controller85';
import { Service85 } from '@services/Service85';
import { Model85 } from '@models/Model85';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller85);
const service = container.resolve(Service85);
const model = new Model85();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
