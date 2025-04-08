import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller29 } from '@controllers/Controller29';
import { Service29 } from '@services/Service29';
import { Model29 } from '@models/Model29';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller29);
const service = container.resolve(Service29);
const model = new Model29();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
