import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller122 } from '@controllers/Controller122';
import { Service122 } from '@services/Service122';
import { Model122 } from '@models/Model122';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller122);
const service = container.resolve(Service122);
const model = new Model122();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
