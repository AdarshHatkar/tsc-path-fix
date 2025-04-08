import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller2 } from '@controllers/Controller2';
import { Service2 } from '@services/Service2';
import { Model2 } from '@models/Model2';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller2);
const service = container.resolve(Service2);
const model = new Model2();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
