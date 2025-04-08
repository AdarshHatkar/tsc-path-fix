import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller105 } from '@controllers/Controller105';
import { Service105 } from '@services/Service105';
import { Model105 } from '@models/Model105';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller105);
const service = container.resolve(Service105);
const model = new Model105();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
