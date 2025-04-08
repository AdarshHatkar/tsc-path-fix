import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller96 } from '@controllers/Controller96';
import { Service96 } from '@services/Service96';
import { Model96 } from '@models/Model96';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller96);
const service = container.resolve(Service96);
const model = new Model96();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
