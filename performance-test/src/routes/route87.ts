import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller87 } from '@controllers/Controller87';
import { Service87 } from '@services/Service87';
import { Model87 } from '@models/Model87';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller87);
const service = container.resolve(Service87);
const model = new Model87();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
