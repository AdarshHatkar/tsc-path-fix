import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller118 } from '@controllers/Controller118';
import { Service118 } from '@services/Service118';
import { Model118 } from '@models/Model118';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller118);
const service = container.resolve(Service118);
const model = new Model118();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
