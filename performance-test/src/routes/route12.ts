import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller12 } from '@controllers/Controller12';
import { Service12 } from '@services/Service12';
import { Model12 } from '@models/Model12';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller12);
const service = container.resolve(Service12);
const model = new Model12();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
