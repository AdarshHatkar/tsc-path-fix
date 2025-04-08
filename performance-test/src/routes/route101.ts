import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller101 } from '@controllers/Controller101';
import { Service101 } from '@services/Service101';
import { Model101 } from '@models/Model101';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller101);
const service = container.resolve(Service101);
const model = new Model101();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
