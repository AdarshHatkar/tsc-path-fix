import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller27 } from '@controllers/Controller27';
import { Service27 } from '@services/Service27';
import { Model27 } from '@models/Model27';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller27);
const service = container.resolve(Service27);
const model = new Model27();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
