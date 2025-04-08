import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller21 } from '@controllers/Controller21';
import { Service21 } from '@services/Service21';
import { Model21 } from '@models/Model21';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller21);
const service = container.resolve(Service21);
const model = new Model21();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
