import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller71 } from '@controllers/Controller71';
import { Service71 } from '@services/Service71';
import { Model71 } from '@models/Model71';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller71);
const service = container.resolve(Service71);
const model = new Model71();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
