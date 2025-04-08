import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller86 } from '@controllers/Controller86';
import { Service86 } from '@services/Service86';
import { Model86 } from '@models/Model86';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller86);
const service = container.resolve(Service86);
const model = new Model86();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
