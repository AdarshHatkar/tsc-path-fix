import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller30 } from '@controllers/Controller30';
import { Service30 } from '@services/Service30';
import { Model30 } from '@models/Model30';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller30);
const service = container.resolve(Service30);
const model = new Model30();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
