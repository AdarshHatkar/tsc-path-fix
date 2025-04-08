import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller113 } from '@controllers/Controller113';
import { Service113 } from '@services/Service113';
import { Model113 } from '@models/Model113';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller113);
const service = container.resolve(Service113);
const model = new Model113();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
