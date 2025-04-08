import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller8 } from '@controllers/Controller8';
import { Service8 } from '@services/Service8';
import { Model8 } from '@models/Model8';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller8);
const service = container.resolve(Service8);
const model = new Model8();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
