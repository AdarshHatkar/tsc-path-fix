import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller52 } from '@controllers/Controller52';
import { Service52 } from '@services/Service52';
import { Model52 } from '@models/Model52';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller52);
const service = container.resolve(Service52);
const model = new Model52();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
