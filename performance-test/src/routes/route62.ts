import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller62 } from '@controllers/Controller62';
import { Service62 } from '@services/Service62';
import { Model62 } from '@models/Model62';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller62);
const service = container.resolve(Service62);
const model = new Model62();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
