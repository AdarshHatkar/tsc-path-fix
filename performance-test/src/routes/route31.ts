import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller31 } from '@controllers/Controller31';
import { Service31 } from '@services/Service31';
import { Model31 } from '@models/Model31';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller31);
const service = container.resolve(Service31);
const model = new Model31();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
