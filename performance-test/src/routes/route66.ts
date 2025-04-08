import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller66 } from '@controllers/Controller66';
import { Service66 } from '@services/Service66';
import { Model66 } from '@models/Model66';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller66);
const service = container.resolve(Service66);
const model = new Model66();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
