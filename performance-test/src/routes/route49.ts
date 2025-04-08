import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller49 } from '@controllers/Controller49';
import { Service49 } from '@services/Service49';
import { Model49 } from '@models/Model49';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller49);
const service = container.resolve(Service49);
const model = new Model49();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
