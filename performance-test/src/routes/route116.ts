import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller116 } from '@controllers/Controller116';
import { Service116 } from '@services/Service116';
import { Model116 } from '@models/Model116';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller116);
const service = container.resolve(Service116);
const model = new Model116();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
