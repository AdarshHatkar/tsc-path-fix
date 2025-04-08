import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller9 } from '@controllers/Controller9';
import { Service9 } from '@services/Service9';
import { Model9 } from '@models/Model9';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller9);
const service = container.resolve(Service9);
const model = new Model9();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
