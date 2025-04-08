import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller51 } from '@controllers/Controller51';
import { Service51 } from '@services/Service51';
import { Model51 } from '@models/Model51';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller51);
const service = container.resolve(Service51);
const model = new Model51();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
