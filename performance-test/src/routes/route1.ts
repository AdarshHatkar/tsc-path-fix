import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller1 } from '@controllers/Controller1';
import { Service1 } from '@services/Service1';
import { Model1 } from '@models/Model1';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller1);
const service = container.resolve(Service1);
const model = new Model1();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
