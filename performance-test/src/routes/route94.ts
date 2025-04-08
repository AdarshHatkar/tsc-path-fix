import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller94 } from '@controllers/Controller94';
import { Service94 } from '@services/Service94';
import { Model94 } from '@models/Model94';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller94);
const service = container.resolve(Service94);
const model = new Model94();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
