import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller53 } from '@controllers/Controller53';
import { Service53 } from '@services/Service53';
import { Model53 } from '@models/Model53';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller53);
const service = container.resolve(Service53);
const model = new Model53();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
