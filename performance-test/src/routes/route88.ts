import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller88 } from '@controllers/Controller88';
import { Service88 } from '@services/Service88';
import { Model88 } from '@models/Model88';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller88);
const service = container.resolve(Service88);
const model = new Model88();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
