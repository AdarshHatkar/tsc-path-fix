import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller24 } from '@controllers/Controller24';
import { Service24 } from '@services/Service24';
import { Model24 } from '@models/Model24';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller24);
const service = container.resolve(Service24);
const model = new Model24();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
