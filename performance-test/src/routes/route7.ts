import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller7 } from '@controllers/Controller7';
import { Service7 } from '@services/Service7';
import { Model7 } from '@models/Model7';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller7);
const service = container.resolve(Service7);
const model = new Model7();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
