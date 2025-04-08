import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller98 } from '@controllers/Controller98';
import { Service98 } from '@services/Service98';
import { Model98 } from '@models/Model98';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller98);
const service = container.resolve(Service98);
const model = new Model98();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
