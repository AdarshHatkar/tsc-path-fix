import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller90 } from '@controllers/Controller90';
import { Service90 } from '@services/Service90';
import { Model90 } from '@models/Model90';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller90);
const service = container.resolve(Service90);
const model = new Model90();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
