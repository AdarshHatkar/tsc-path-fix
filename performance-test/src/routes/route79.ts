import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller79 } from '@controllers/Controller79';
import { Service79 } from '@services/Service79';
import { Model79 } from '@models/Model79';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller79);
const service = container.resolve(Service79);
const model = new Model79();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
