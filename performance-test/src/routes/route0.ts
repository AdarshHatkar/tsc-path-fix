import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller0 } from '@controllers/Controller0';
import { Service0 } from '@services/Service0';
import { Model0 } from '@models/Model0';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller0);
const service = container.resolve(Service0);
const model = new Model0();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
