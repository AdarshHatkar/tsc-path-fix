import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller5 } from '@controllers/Controller5';
import { Service5 } from '@services/Service5';
import { Model5 } from '@models/Model5';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller5);
const service = container.resolve(Service5);
const model = new Model5();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
