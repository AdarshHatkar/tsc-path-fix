import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller75 } from '@controllers/Controller75';
import { Service75 } from '@services/Service75';
import { Model75 } from '@models/Model75';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller75);
const service = container.resolve(Service75);
const model = new Model75();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
