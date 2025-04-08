import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller110 } from '@controllers/Controller110';
import { Service110 } from '@services/Service110';
import { Model110 } from '@models/Model110';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller110);
const service = container.resolve(Service110);
const model = new Model110();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
