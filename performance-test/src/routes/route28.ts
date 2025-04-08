import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller28 } from '@controllers/Controller28';
import { Service28 } from '@services/Service28';
import { Model28 } from '@models/Model28';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller28);
const service = container.resolve(Service28);
const model = new Model28();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
