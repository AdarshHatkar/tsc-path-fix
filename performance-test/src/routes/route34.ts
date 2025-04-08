import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller34 } from '@controllers/Controller34';
import { Service34 } from '@services/Service34';
import { Model34 } from '@models/Model34';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller34);
const service = container.resolve(Service34);
const model = new Model34();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
