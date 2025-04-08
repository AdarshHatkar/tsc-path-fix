import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller40 } from '@controllers/Controller40';
import { Service40 } from '@services/Service40';
import { Model40 } from '@models/Model40';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller40);
const service = container.resolve(Service40);
const model = new Model40();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
