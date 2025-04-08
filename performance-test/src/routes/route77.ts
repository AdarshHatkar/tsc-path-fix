import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller77 } from '@controllers/Controller77';
import { Service77 } from '@services/Service77';
import { Model77 } from '@models/Model77';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller77);
const service = container.resolve(Service77);
const model = new Model77();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
