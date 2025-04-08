import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller111 } from '@controllers/Controller111';
import { Service111 } from '@services/Service111';
import { Model111 } from '@models/Model111';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller111);
const service = container.resolve(Service111);
const model = new Model111();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
