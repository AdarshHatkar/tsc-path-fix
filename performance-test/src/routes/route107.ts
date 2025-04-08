import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller107 } from '@controllers/Controller107';
import { Service107 } from '@services/Service107';
import { Model107 } from '@models/Model107';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller107);
const service = container.resolve(Service107);
const model = new Model107();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
