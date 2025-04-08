import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller6 } from '@controllers/Controller6';
import { Service6 } from '@services/Service6';
import { Model6 } from '@models/Model6';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller6);
const service = container.resolve(Service6);
const model = new Model6();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
