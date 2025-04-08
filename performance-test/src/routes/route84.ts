import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller84 } from '@controllers/Controller84';
import { Service84 } from '@services/Service84';
import { Model84 } from '@models/Model84';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller84);
const service = container.resolve(Service84);
const model = new Model84();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
