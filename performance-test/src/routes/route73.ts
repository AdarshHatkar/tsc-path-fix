import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller73 } from '@controllers/Controller73';
import { Service73 } from '@services/Service73';
import { Model73 } from '@models/Model73';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller73);
const service = container.resolve(Service73);
const model = new Model73();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
