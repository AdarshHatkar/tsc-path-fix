import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller3 } from '@controllers/Controller3';
import { Service3 } from '@services/Service3';
import { Model3 } from '@models/Model3';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller3);
const service = container.resolve(Service3);
const model = new Model3();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
