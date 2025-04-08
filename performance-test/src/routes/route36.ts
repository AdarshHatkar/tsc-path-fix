import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller36 } from '@controllers/Controller36';
import { Service36 } from '@services/Service36';
import { Model36 } from '@models/Model36';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller36);
const service = container.resolve(Service36);
const model = new Model36();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
