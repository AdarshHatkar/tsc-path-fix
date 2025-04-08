import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller81 } from '@controllers/Controller81';
import { Service81 } from '@services/Service81';
import { Model81 } from '@models/Model81';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller81);
const service = container.resolve(Service81);
const model = new Model81();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
