import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller55 } from '@controllers/Controller55';
import { Service55 } from '@services/Service55';
import { Model55 } from '@models/Model55';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller55);
const service = container.resolve(Service55);
const model = new Model55();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
