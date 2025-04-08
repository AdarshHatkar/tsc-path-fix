import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller15 } from '@controllers/Controller15';
import { Service15 } from '@services/Service15';
import { Model15 } from '@models/Model15';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller15);
const service = container.resolve(Service15);
const model = new Model15();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
