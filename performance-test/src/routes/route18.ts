import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller18 } from '@controllers/Controller18';
import { Service18 } from '@services/Service18';
import { Model18 } from '@models/Model18';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller18);
const service = container.resolve(Service18);
const model = new Model18();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
