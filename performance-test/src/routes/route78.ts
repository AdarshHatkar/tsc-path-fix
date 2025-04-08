import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller78 } from '@controllers/Controller78';
import { Service78 } from '@services/Service78';
import { Model78 } from '@models/Model78';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller78);
const service = container.resolve(Service78);
const model = new Model78();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
