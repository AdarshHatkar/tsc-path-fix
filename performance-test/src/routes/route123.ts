import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller123 } from '@controllers/Controller123';
import { Service123 } from '@services/Service123';
import { Model123 } from '@models/Model123';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller123);
const service = container.resolve(Service123);
const model = new Model123();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
