import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller114 } from '@controllers/Controller114';
import { Service114 } from '@services/Service114';
import { Model114 } from '@models/Model114';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller114);
const service = container.resolve(Service114);
const model = new Model114();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
