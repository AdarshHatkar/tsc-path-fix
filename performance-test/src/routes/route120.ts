import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller120 } from '@controllers/Controller120';
import { Service120 } from '@services/Service120';
import { Model120 } from '@models/Model120';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller120);
const service = container.resolve(Service120);
const model = new Model120();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
