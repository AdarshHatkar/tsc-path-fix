import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller19 } from '@controllers/Controller19';
import { Service19 } from '@services/Service19';
import { Model19 } from '@models/Model19';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller19);
const service = container.resolve(Service19);
const model = new Model19();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
