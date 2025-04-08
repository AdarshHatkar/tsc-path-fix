import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller89 } from '@controllers/Controller89';
import { Service89 } from '@services/Service89';
import { Model89 } from '@models/Model89';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller89);
const service = container.resolve(Service89);
const model = new Model89();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
