import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller33 } from '@controllers/Controller33';
import { Service33 } from '@services/Service33';
import { Model33 } from '@models/Model33';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller33);
const service = container.resolve(Service33);
const model = new Model33();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
