import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller11 } from '@controllers/Controller11';
import { Service11 } from '@services/Service11';
import { Model11 } from '@models/Model11';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller11);
const service = container.resolve(Service11);
const model = new Model11();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
