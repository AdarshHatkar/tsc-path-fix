import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller54 } from '@controllers/Controller54';
import { Service54 } from '@services/Service54';
import { Model54 } from '@models/Model54';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller54);
const service = container.resolve(Service54);
const model = new Model54();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
