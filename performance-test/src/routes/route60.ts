import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller60 } from '@controllers/Controller60';
import { Service60 } from '@services/Service60';
import { Model60 } from '@models/Model60';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller60);
const service = container.resolve(Service60);
const model = new Model60();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
