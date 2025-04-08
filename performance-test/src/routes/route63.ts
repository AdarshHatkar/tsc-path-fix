import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller63 } from '@controllers/Controller63';
import { Service63 } from '@services/Service63';
import { Model63 } from '@models/Model63';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller63);
const service = container.resolve(Service63);
const model = new Model63();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
