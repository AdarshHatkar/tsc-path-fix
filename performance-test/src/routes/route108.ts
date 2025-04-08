import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller108 } from '@controllers/Controller108';
import { Service108 } from '@services/Service108';
import { Model108 } from '@models/Model108';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller108);
const service = container.resolve(Service108);
const model = new Model108();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
